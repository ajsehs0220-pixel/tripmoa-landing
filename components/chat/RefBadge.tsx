'use client';

import { useState } from 'react';
import styles from './chat.module.css';
import { useSourceLookup } from './SourceLookupContext';
import { formatSourceChannel, truncateSourceTitle } from './sourceUtils';

interface Props {
  id: number;
  onClick: () => void;
}

export default function RefBadge({ id, onClick }: Props) {
  const source = useSourceLookup(id);
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipVisible = showTooltip && !!source;

  return (
    <span className={styles.refBadgeWrap}>
      <button
        type="button"
        className={styles.refBadge}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={
          source
            ? `${formatSourceChannel(source.channel)}: ${source.title}`
            : `출처 ${id}번 보기`
        }
        aria-describedby={tooltipVisible ? `ref-tooltip-${id}` : undefined}
      >
        🔗{id}
      </button>

      {source && (
        <span
          id={`ref-tooltip-${id}`}
          className={`${styles.refTooltip} ${tooltipVisible ? styles.refTooltipVisible : ''}`}
          role="tooltip"
        >
          <span className={styles.refTooltipChannel}>
            {formatSourceChannel(source.channel)}
          </span>
          <span className={styles.refTooltipTitle}>
            {truncateSourceTitle(source.title)}
          </span>
          {source.date && (
            <span className={styles.refTooltipDate}>{source.date}</span>
          )}
        </span>
      )}
    </span>
  );
}
