'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './chat.module.css';

/** chat.module.css .tDotPulse 주기와 맞춤 */
const SPINNER_CYCLE_MS = 1300;
const SPINNER_CYCLES_BEFORE_NEXT = 3;
const TYPEWRITER_MS_PER_CHAR = 40;

/** 답변 노출 전 보여줄 로딩 문구 수 (1~3번) */
export const INTRO_LOADING_STEPS = 3;

const STEPS = [
  '글-리뷰-사진순으로 완성되니 조금만 기다려주세요',
  '모아가 실제 후기들을 꼼꼼하게 살펴보고 있어요!',
  '현장감을 더해줄 생생한 사진들도 함께 모으는 중…',
  '동선을 편하게 보실 수 있도록 맞춤 지도를 그리는 중이에요!',
  '나만의 여행 지도 완성! 곧 화면에 펼쳐집니다.',
];

function delayBeforeNextStep(text: string): number {
  const typewriterMs = text.length * TYPEWRITER_MS_PER_CHAR;
  const spinnerWaitMs = SPINNER_CYCLE_MS * SPINNER_CYCLES_BEFORE_NEXT;
  return typewriterMs + spinnerWaitMs;
}

function TypewriterHint({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, TYPEWRITER_MS_PER_CHAR);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}

type Props = {
  /** intro: 1~3번 문구 후 onIntroComplete / tail: 4~5번(미완성 구간) */
  mode?: 'intro' | 'tail';
  onIntroComplete?: () => void;
};

export default function LoadingMessage({
  mode = 'intro',
  onIntroComplete,
}: Props) {
  const [stepIdx, setStepIdx] = useState(mode === 'tail' ? INTRO_LOADING_STEPS : 0);
  const onIntroCompleteRef = useRef(onIntroComplete);
  onIntroCompleteRef.current = onIntroComplete;

  useEffect(() => {
    if (mode === 'intro') {
      setStepIdx(0);
    } else {
      setStepIdx(INTRO_LOADING_STEPS);
    }
  }, [mode]);

  useEffect(() => {
    const text = STEPS[stepIdx];
    if (!text) return;

    const delay = delayBeforeNextStep(text);

    if (mode === 'intro') {
      if (stepIdx >= INTRO_LOADING_STEPS - 1) {
        const t = setTimeout(() => onIntroCompleteRef.current?.(), delay);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setStepIdx((i) => i + 1), delay);
      return () => clearTimeout(t);
    }

    // tail: 4~5번 문구, 마지막은 스트리밍 끝날 때까지 유지
    if (stepIdx >= STEPS.length - 1) return;
    const t = setTimeout(() => setStepIdx((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [stepIdx, mode]);

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
            key={`${mode}-${stepIdx}`}
            className={styles.loadingLabel}
            role="status"
            aria-live="polite"
          >
            <TypewriterHint key={`${mode}-${stepIdx}`} text={STEPS[stepIdx]} />
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
