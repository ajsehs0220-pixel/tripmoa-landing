'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './chat.module.css';
import { useSourceLookup } from './SourceLookupContext';
import { formatSourceChannel, truncateSourceTitle, displaySourceTitle } from './sourceUtils';

/** Link emoji via Unicode escape (avoids merge/encoding corruption) */
const LINK_ICON = '\u{1F517}';

interface Props {
  id: number;
  onClick: () => void;
}

export default function RefBadge({ id, onClick }: Props) {
  const source = useSourceLookup(id);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  const showTooltip = pinned || hovered;

  useEffect(() => {
    if (!pinned) return;
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

  return (
    <span className={styles.refBadgeWrap} ref={wrapRef}>
      <button
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
            : `\uCD9C\uCC98 ${id}\uBC88 \uBCF4\uAE30`
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
                    <span className={styles.refBadgeLabel}>{'\uD611\uCC30'}</span>
                  )}
                </span>
              )}
            </>
          ) : (
            <span className={styles.refTooltipTitle}>
              {'\uCD9C\uCC98 \uC815\uBCF4 '}
              {id}
              {'\uBC88'}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
