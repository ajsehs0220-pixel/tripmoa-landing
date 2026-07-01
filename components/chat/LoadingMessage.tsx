'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './chat.module.css';

const STEPS = [
  { text: '모아가 발로 뛰며 찾는 중이에요', duration: 3000 },
  { text: '진짜 후기만 골라내는 중이에요', duration: 4000 },
  { text: '모아가 열심히 읽고 있어요', duration: 5000 },
  { text: '장소 정보를 지도에 꽂는 중이에요', duration: 999999 },
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