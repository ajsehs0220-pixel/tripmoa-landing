'use client';

import styles from './chat.module.css';

interface Props {
  reviewCount: number;
  placeCount: number;
  genTime: number;
}

export default function AIAnalysisCard({ reviewCount, placeCount, genTime }: Props) {
  const confidence = Math.min(98, 72 + Math.floor(reviewCount * 0.18));

  return (
    <div className={styles.analysisCard}>
      <div className={styles.analysisHeader}>
        <span className={styles.analysisBrain}>🧠</span>
        <span className={styles.analysisTitle}>실리뷰 분석</span>
      </div>
      <div className={styles.analysisStats}>
        <div className={styles.analysisStat}>
          <span className={styles.statNum}>{reviewCount}</span>
          <span className={styles.statLabel}>총 리뷰</span>
        </div>
        <div className={styles.analysisDivider} />
        <div className={styles.analysisStat}>
          <span className={styles.statNum}>{confidence}%</span>
          <span className={styles.statLabel}>신뢰도</span>
        </div>
        <div className={styles.analysisDivider} />
        <div className={styles.analysisStat}>
          <span className={styles.statNum}>{placeCount}</span>
          <span className={styles.statLabel}>분석 장소</span>
        </div>
        <div className={styles.analysisDivider} />
        <div className={styles.analysisStat}>
          <span className={styles.statNum}>{genTime.toFixed(1)}s</span>
          <span className={styles.statLabel}>분석 시간</span>
        </div>
      </div>
    </div>
  );
}
