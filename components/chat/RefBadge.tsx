'use client';

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './chat.module.css';
import { useSourceLookup } from './SourceLookupContext';
import { formatSourceChannel, truncateSourceTitle, displaySourceTitle } from './sourceUtils';

const LINK_ICON = '\u{1F517}';

// SSR에서 "useLayoutEffect does nothing on the server" 경고 방지 +
// 브라우저에서는 paint 전에 위치를 계산해 첫 프레임 깜빡임(flash)을 없앤다.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface Props {
  id: number;
  onClick: () => void;
}

export default function RefBadge({ id, onClick }: Props) {
  const source = useSourceLookup(id);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const wrapRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const showTooltip = pinned || hovered;

  // 배지 위치 + (있으면) 실제 렌더된 툴팁 높이를 기준으로
  // 가로는 clamp, 세로는 아래 공간이 부족하면 위로 flip.
  const calcTooltipStyle = useCallback(() => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const tooltipW = Math.min(280, window.innerWidth - 32);
    const badgeCenter = rect.left + rect.width / 2;
    const EDGE = 16;
    const GAP = 6;

    let left = badgeCenter - tooltipW / 2;
    if (left < EDGE) left = EDGE;
    if (left + tooltipW > window.innerWidth - EDGE) {
      left = window.innerWidth - EDGE - tooltipW;
    }

    // 첫 계산 시점엔 툴팁이 아직 DOM에 없을 수 있어 대략값(90)으로 추정하고,
    // 마운트 이후 실제 높이로 다시 보정한다.
    const tooltipH = tooltipRef.current?.getBoundingClientRect().height ?? 90;

    const spaceBelow = window.innerHeight - rect.bottom - GAP;
    const spaceAbove = rect.top - GAP;

    let top: number;
    if (spaceBelow >= tooltipH || spaceBelow >= spaceAbove) {
      // 아래쪽 배치 (기본)
      top = rect.bottom + GAP;
      if (top + tooltipH > window.innerHeight - EDGE) {
        top = Math.max(EDGE, window.innerHeight - EDGE - tooltipH);
      }
    } else {
      // 아래 공간 부족 → 위쪽으로 flip
      top = rect.top - GAP - tooltipH;
      if (top < EDGE) top = EDGE;
    }

    setTooltipStyle({
      position: 'fixed',
      top,
      left,
      width: tooltipW,
      transform: 'none', // ← CSS 모듈의 translateX(-50%)를 명시적으로 무효화
      zIndex: 9999,
    });
  }, []);

  // 툴팁이 뜰 때: 즉시 1차 계산 + 실제 마운트 후 높이 반영해 재계산
  // + 스크롤/리사이즈 시 위치 재계산 (기존엔 없었음)
  useIsomorphicLayoutEffect(() => {
    if (!showTooltip) return;

    calcTooltipStyle();
    const raf = requestAnimationFrame(() => calcTooltipStyle());

    const reposition = () => calcTooltipStyle();
    window.addEventListener('scroll', reposition, true); // capture: 내부 스크롤 컨테이너도 감지
    window.addEventListener('resize', reposition);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [showTooltip, calcTooltipStyle]);

  // 바깥 클릭 시 닫기 — 툴팁이 Portal로 body에 붙으므로
  // wrapRef뿐 아니라 tooltipRef도 함께 확인해야 한다.
  useEffect(() => {
    if (!pinned) return;

    const close = (e: Event) => {
      const target = e.target as Node;
      if (
        !wrapRef.current?.contains(target) &&
        !tooltipRef.current?.contains(target)
      ) {
        setPinned(false);
      }
    };
    document.addEventListener('touchstart', close, { passive: true });
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('touchstart', close);
      document.removeEventListener('click', close);
    };
  }, [pinned]);

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (source) {
      setPinned((p) => !p);
      return;
    }
    onClick();
  };

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPinned(false);
    setHovered(false);
    onClick();
  };

  const tooltipNode = showTooltip ? (
    <span
      ref={tooltipRef}
      id={`ref-tooltip-${id}`}
      role="button"
      tabIndex={pinned ? 0 : -1}
      className={`${styles.refTooltip} ${styles.refTooltipVisible}`}
      style={tooltipStyle}
      onClick={handleTooltipClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setPinned(false);
          setHovered(false);
          onClick();
        }
      }}
    >
      {source ? (
        <>
          <span className={styles.refTooltipChannel}>
            {formatSourceChannel(source.channel)}
          </span>
          <span className={styles.refTooltipTitle}>
            {truncateSourceTitle(displaySourceTitle(source))}
          </span>
          {(source.date || source.is_ad) && (
            <span className={styles.refTooltipMeta}>
              {source.date && (
                <span className={styles.refTooltipDate}>{source.date}</span>
              )}
              {source.is_ad && (
                <span className={styles.refBadgeLabel}>협찬</span>
              )}
            </span>
          )}
        </>
      ) : (
        <span className={styles.refTooltipTitle}>
          출처 정보 {id}번
        </span>
      )}
    </span>
  ) : null;

  return (
    <span className={styles.refBadgeWrap} ref={wrapRef}>
      <button
        ref={badgeRef}
        type="button"
        className={styles.refBadge}
        onClick={handleBadgeClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={
          source
            ? `${formatSourceChannel(source.channel)}: ${displaySourceTitle(source)}`
            : `출처 ${id}번 보기`
        }
        aria-expanded={pinned}
        aria-describedby={showTooltip ? `ref-tooltip-${id}` : undefined}
      >
        {LINK_ICON}
        {id}
      </button>

      {/* Portal: document.body에 직접 렌더 → 조상 transform(fixed 기준 왜곡),
         overflow:hidden 잘림 문제를 원천 차단 */}
      {tooltipNode && typeof document !== 'undefined'
        ? createPortal(tooltipNode, document.body)
        : null}
    </span>
  );
}