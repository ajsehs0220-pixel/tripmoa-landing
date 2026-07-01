'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './chat.module.css';

const STEPS = [
  { text: '모아가 실제 후기들을 꼼꼼하게 살펴보고 있어요!', duration: 7000 },
  { text: '현장감을 더해줄 생생한 사진들도 함께 모으는 중…', duration: 7000 },
  { text: '동선을 편하게 보실 수 있도록 맞춤 지도를 그리는 중이에요!', duration: 7000 },
  { text: '나만의 여행 지도 완성! 곧 화면에 펼쳐집니다.', duration: 999999 },
];

function TypewriterHint({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}

export default function LoadingMessage() {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (stepIdx >= STEPS.length - 1) return;
    const t = setTimeout(() => {
      setStepIdx((i) => i + 1);
    }, STEPS[stepIdx].duration);
    return () => clearTimeout(t);
  }, [stepIdx]);

  return (
    <div className={styles.loadingRow}>
      <div className={styles.mascotFlying} aria-hidden="true">
        <Image
          src="/moaLogo.png"
          alt=""
          width={56}
          height={56}
          className={styles.mascotImg}
        />
      </div>
      <div className={styles.loadingTextWrap}>
        <div className={styles.loadingTop}>
          <span
            key={stepIdx}
            className={styles.loadingLabel}
            role="status"
            aria-live="polite"
          >
            <TypewriterHint key={stepIdx} text={STEPS[stepIdx].text} />
          </span>
          <span className={styles.typingDots} aria-hidden="true">
            <span className={styles.tDot} />
            <span className={styles.tDot} />
            <span className={styles.tDot} />
          </span>
        </div>
      </div>
    </div>
  );
}