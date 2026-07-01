'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './chat.module.css';
import { useSourceLookup } from './SourceLookupContext';
import { formatSourceChannel, truncateSourceTitle, displaySourceTitle } from './sourceUtils';

const LINK_ICON = '\u{1F517}';

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

  const showTooltip = pinned || hovered;

  const calcTooltipStyle = useCallback(() => {
    if (!badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    const tooltipW = Math.min(280, window.innerWidth - 32);
    const badgeCenter = rect.left + rect.width / 2;
    const EDGE = 16;

    let left = badgeCenter - tooltipW / 2;
    if (left < EDGE) left = EDGE;
    if (left + tooltipW > window.innerWidth - EDGE) {
      left = window.innerWidth - EDGE - tooltipW;
    }

    setTooltipStyle({
      position: 'fixed',
      top: rect.bottom + 6,
      left,
      width: tooltipW,
      zIndex: 9999,
    });
  }, []);

  useEffect(() => {
    if (!pinned) return;
    calcTooltipStyle();

    const close = (e: Event) => {
      if (!wrapRef.current?.contains(e.target as Node)) {
        setPinned(false);
      }
    };
    document.addEventListener('touchstart', close, { passive: true });
    document.addEventListener('click', close);
    return () => {
      document.removeEventListener('touchstart', close);
      document.removeEventListener('click', close);
    };
  }, [pinned, calcTooltipStyle]);

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

  return (
    <span className={styles.refBadgeWrap} ref={wrapRef}>
      <button
        ref={badgeRef}
        type="button"
        className={styles.refBadge}
        onClick={handleBadgeClick}
        onMouseEnter={() => { setHovered(true); calcTooltipStyle(); }}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => { setHovered(true); calcTooltipStyle(); }}
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

      {showTooltip && (
        <span
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
      )}
    </span>
  );
}