'use client';

import styles from './chat.module.css';
import RenderContent from './RenderContent';
import { formatWarningShort } from './warningUtils';

interface Props {
  warnings: string[] | null | undefined;
  onRefClick: (id: number) => void;
  dedupeRefs?: Set<number>;
}

export default function PlaceWarnings({ warnings, onRefClick, dedupeRefs }: Props) {
  if (!warnings?.length) return null;

  return (
    <div className={styles.placeWarningsBox} role="note" aria-label="주의사항">
      <div className={styles.placeWarnings}>
        {warnings.map((w, i) => (
          <p key={i} className={styles.placeWarning}>
            <span className={styles.placeWarningIcon} aria-hidden="true">📌</span>
            <span className={styles.placeWarningBody}>
              <RenderContent
                content={formatWarningShort(w)}
                onRefClick={onRefClick}
                dedupeRefs={dedupeRefs}
              />
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}