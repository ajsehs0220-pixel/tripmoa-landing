'use client';

import Image from 'next/image';
import styles from './chat.module.css';

const STEPS = [
  '모아가 발로 뛰며 찾는 중이에요',
  '실제 방문 후기 분석 중',
  'AI가 여행 일정 구성 중',
];

export default function LoadingMessage() {
  return (
    <div className={styles.assistantRow}>
      <div className={styles.mascotFlying} aria-hidden="true">
        <Image
          src="/moaLogo.png"
          alt=""
          width={56}
          height={56}
          className={styles.mascotImg}
        />
      </div>
      <div className={styles.loadingWrap}>
        <div className={styles.loadingTop}>
          <span className={styles.loadingLabel}>실제 후기 분석 중</span>
          <span className={styles.typingDots} aria-hidden="true">
            <span className={styles.tDot} />
            <span className={styles.tDot} />
            <span className={styles.tDot} />
          </span>
        </div>
        <span className={styles.loadingHint} role="status" aria-live="polite">
          {STEPS[0]}
        </span>
      </div>
    </div>
  );
}