'use client';

import { useState, useRef, useEffect, type CSSProperties } from 'react';
import styles from './chat.module.css';
import { useSourceLookup } from './SourceLookupContext';
import {
  formatSourceChannel,
  truncateSourceTitle,
} from './sourceUtils';

interface Props {
  id: number;
}

const TOOLTIP_MAX_WIDTH = 280;
const EDGE_PADDING = 16;

export default function RefBadge({ id }: Props) {
  const source = useSourceLookup(id);

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<CSSProperties>({});

  const wrapRef = useRef<HTMLSpanElement>(null);
  const badgeRef = useRef<HTMLButtonElement>(null);

  const tooltipVisible = showTooltip && !!source;

  useEffect(() => {
    if (!tooltipVisible || !badgeRef.current) return;

    const badgeRect = badgeRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    const badgeCenter = badgeRect.left + badgeRect.width / 2;
    const halfTooltip = TOOLTIP_MAX_WIDTH / 2;

    const idealLeft = badgeCenter - halfTooltip;
    const idealRight = badgeCenter + halfTooltip;

    let style: CSSProperties = {
      left: '50%',
      transform: 'translateX(-50%)',
    };

    if (idealLeft < EDGE_PADDING) {
      const shift = EDGE_PADDING - idealLeft;
      style = {
        left: `calc(50% + ${shift}px)`,
        transform: 'translateX(-50%)',
      };
    } else if (idealRight > viewportWidth - EDGE_PADDING) {
      const shift = idealRight - (viewportWidth - EDGE_PADDING);
      style = {
        left: `calc(50% - ${shift}px)`,
        transform: 'translateX(-50%)',
      };
    }

    setTooltipStyle(style);
  }, [tooltipVisible]);

  useEffect(() => {
    if (!showTooltip) return;

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(e.target as Node)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [showTooltip]);

  return (
    <span className={styles.refBadgeWrap} ref={wrapRef}>
      <button
        ref={badgeRef}
        type="button"
        className={styles.refBadge}
        onClick={() => setShowTooltip((v) => !v)}
        aria-label={
          source
            ? `${formatSourceChannel(source.channel)}: ${source.title}`
            : `출처 ${id}번`
        }
        aria-expanded={tooltipVisible}
        aria-describedby={
          tooltipVisible ? `ref-tooltip-${id}` : undefined
        }
      >
        🔗{id}
      </button>

      {source && (
        <span
          id={`ref-tooltip-${id}`}
          className={`${styles.refTooltip} ${
            tooltipVisible ? styles.refTooltipVisible : ''
          }`}
          style={tooltipVisible ? tooltipStyle : undefined}
          role="tooltip"
        >
          <span className={styles.refTooltipChannel}>
            {formatSourceChannel(source.channel)}
          </span>

          <span className={styles.refTooltipTitle}>
            {truncateSourceTitle(source.title)}
          </span>

          {source.date && (
            <span className={styles.refTooltipDate}>
              {source.date}
            </span>
          )}

          {source.link && (
            <a
              className={styles.refTooltipLink}
              href={source.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              원문 보기 →
            </a>
          )}
        </span>
      )}
    </span>
  );
}