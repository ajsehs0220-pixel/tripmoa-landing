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
        aria-controls="source-list"
      >
        <span className={styles.sourceToggleLeft}>
          참고 후기{' '}
          <span className={styles.sourceCount}>({sources.length}건)</span>
        </span>
        <span
          className={`${styles.sourceChevron} ${open ? styles.sourceChevronOpen : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      <div
        id="source-list"
        className={`${styles.sourceListWrap} ${open ? styles.sourceListWrapOpen : ''}`}
      >
        <div className={styles.sourceListInner}>
          <div className={styles.sourceGrid}>
            {sources.map((s) => (
              <div
                key={s.id}
                id={`source-${s.id}`}
                className={styles.sourceCard}
              >
                <span className={styles.sourceCardChannel}>
                  {sourceBadge(s.channel)}
                </span>
                <p className={styles.sourceCardTitle}>{s.title}</p>
                <div className={styles.sourceCardMeta}>
                  {s.date && (
                    <span className={styles.sourceCardDate}>{s.date}</span>
                  )}
                  {s.link ? (
                    <a
                      className={styles.sourceCardLink}
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onSourceClick(s.link)}
                    >
                      🔗 원문 보기
                    </a>
                  ) : (
                    <span className={styles.sourceCardDate}>링크 없음</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
