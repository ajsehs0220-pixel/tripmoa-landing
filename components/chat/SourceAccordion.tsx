'use client';

import { useState, useEffect } from 'react';
import styles from './chat.module.css';
import type { Source } from './types';
import { formatSourceChannel } from './sourceUtils';

interface Props {
  sources: Source[];
  onSourceClick: (url: string) => void;
  /** 여러 턴 채팅 시 출처 id·아코디언 열기 구분용 */
  messageId?: string;
}

export default function SourceAccordion({
  sources,
  onSourceClick,
  messageId,
}: Props) {
  const [open, setOpen] = useState(false);
  const sourceIdPrefix = messageId ? `${messageId}-` : '';

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ messageId?: string }>).detail;

      if (detail?.messageId && messageId && detail.messageId !== messageId) {
        return;
      }

      setOpen(true);
    };

    window.addEventListener('tripmoa:openSources', handler);

    return () => {
      window.removeEventListener('tripmoa:openSources', handler);
    };
  }, [messageId]);

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
          <span className={styles.sourceCount}>
            ({sources.length}건)
          </span>
        </span>

        <span
          className={`${styles.sourceChevron} ${
            open ? styles.sourceChevronOpen : ''
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      <div
        id="source-list"
        className={`${styles.sourceListWrap} ${
          open ? styles.sourceListWrapOpen : ''
        }`}
      >
        <div className={styles.sourceListInner}>
          <div className={styles.sourceList}>
            {sources.map((s) => (
              <div
                key={s.id}
                id={`source-${sourceIdPrefix}${s.id}`}
                className={styles.sourceRow}
              >
                <div className={styles.sourceRowMeta}>
                  <span className={styles.sourceRowChannel}>
                    {formatSourceChannel(s.channel)}
                  </span>

                  {s.date && (
                    <span className={styles.sourceRowDate}>
                      {s.date}
                    </span>
                  )}
                </div>

                <p className={styles.sourceRowTitle}>
                  {s.title}
                </p>

                {s.link ? (
                  <a
                    className={styles.sourceRowLink}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onSourceClick(s.link)}
                  >
                    원문 보기 →
                  </a>
                ) : (
                  <span className={styles.sourceRowLinkDisabled}>
                    링크 없음
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}