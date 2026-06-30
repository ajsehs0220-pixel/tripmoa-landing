'use client';

import styles from './chat.module.css';

interface Props {
  reviewCount: number;
  placeCount: number;
}

export default function AIAnalysisCard({ reviewCount, placeCount }: Props) {
  const confidence = Math.min(98, 72 + Math.floor(reviewCount * 0.18));

  return (
    <div className={styles.analysisCard}>
      <div className={styles.analysisHeader}>
        <span className={styles.analysisBrain} aria-hidden="true">🔍</span>
        <span className={styles.analysisTitle}>실리뷰 분석</span>
      </div>

      <div className={styles.analysisStats}>
        <div className={styles.analysisStat}>
          <span className={styles.statNum}>{reviewCount}</span>
          <span className={styles.statLabel}>총 리뷰</span>
        </div>
        <div className={styles.analysisDivider} aria-hidden="true" />
        <div className={styles.analysisStat}>
          <span className={styles.statNum}>{confidence}%</span>
          <span className={styles.statLabel}>일치도</span>
        </div>
        <div className={styles.analysisDivider} aria-hidden="true" />
        <div className={styles.analysisStat}>
          <span className={styles.statNum}>{placeCount}</span>
          <span className={styles.statLabel}>분석 장소</span>
        </div>
      </div>
    </div>
  );
}
