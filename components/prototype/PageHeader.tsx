'use client';

import styles from './PageHeader.module.css';

type PageHeaderProps = {
  onBack?: () => void;
  onClose?: () => void;
  backLabel?: string;
};

export default function PageHeader({ onBack, onClose, backLabel = '이전' }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        {onBack && (
          <button className={styles.backBtn} onClick={onBack} aria-label={backLabel}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        <span className={styles.headerWordmark}>
          <span className={styles.wTrip}>Trip</span>
          <span className={styles.wMoa}> MOA</span>
        </span>
      </div>
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
