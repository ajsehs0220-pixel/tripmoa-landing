'use client';

import { useState, useEffect } from 'react';
import styles from './chat.module.css';
import type { Source } from './types';

function sourceBadge(channel: string): string {
  if (channel?.includes('카페')) return '네이버 카페';
  if (channel?.includes('블로그')) return '네이버 블로그';
  return channel || '웹';
}

interface Props {
  sources: Source[];
  onSourceClick: (url: string) => void;
}

export default function SourceAccordion({ sources, onSourceClick }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('tripmoa:openSources', handler);
    return () => window.removeEventListener('tripmoa:openSources', handler);
  }, []);

  if (sources.length === 0) return null;

  return (
    <div className={styles.sourceAccordion}>
      <button
        type="button"
        className={styles.sourceToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.sourceToggleLeft}>
          참고 후기{' '}
          <span className={styles.sourceCount}>({sources.length}건)</span>
        </span>
        <span className={`${styles.sourceChevron} ${open ? styles.sourceChevronOpen : ''}`}>▼</span>
      </button>

      <div className={`${styles.sourceListWrap} ${open ? styles.sourceListWrapOpen : ''}`}>
        <div className={styles.sourceListInner}>
          <ul className={styles.sourceList}>
            {sources.map((s) => (
              <li key={s.id} id={`source-${s.id}`} className={styles.sourceRow}>
                <span className={styles.sourceRowChannel}>{sourceBadge(s.channel)}</span>
                {s.date && <span className={styles.sourceRowDate}>{s.date}</span>}
                <span className={styles.sourceRowTitle}>{s.title}</span>
                <a
                  className={styles.sourceRowLink}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onSourceClick(s.link)}
                >
                  원문 보기 →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
