'use client';

import styles from './chat.module.css';

const STEPS = [
  '네이버 카페·블로그 리뷰 수집 중',
  '실제 방문 후기 분석 중',
  'AI가 여행 일정 구성 중',
];

export default function LoadingMessage() {
  return (
    <div className={styles.assistantRow}>
      <div className={styles.avatar} aria-hidden="true">✈</div>
      <div className={styles.loadingWrap}>
        <div className={styles.loadingTop}>
          <div className={styles.typingDots} aria-hidden="true">
            <span className={styles.tDot} />
            <span className={styles.tDot} />
            <span className={styles.tDot} />
          </div>
          <span className={styles.loadingLabel}>실제 후기 분석 중…</span>
        </div>
        <span className={styles.loadingHint} role="status" aria-live="polite">
          {STEPS[0]}
        </span>
      </div>
    </div>
  );
}
