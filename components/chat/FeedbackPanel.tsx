'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './FeedbackPanel.module.css';
import { trackEvent } from '@/lib/gtag';

interface FeedbackPanelProps {
  query: string;
  city?: string;
  searchId?: string | null;
  onClose?: () => void;
}

export default function FeedbackPanel({ query, city, searchId, onClose }: FeedbackPanelProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [step, setStep] = useState<'rating' | 'comment' | 'done'>('rating');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 250);
  };

  const handleRatingNext = () => {
    if (!rating) return;
    setStep('comment');
  };

  const handleSubmit = async () => {
    trackEvent('submit_feedback', { rating, query, city });

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search_id: searchId, query, city, rating, comment }),
      });
    } catch (e) {
      console.error('feedback 전송 실패:', e);
    }

    sessionStorage.setItem('tripmoa-feedback-done', 'true');
    setStep('done');
    setTimeout(() => handleClose(), 1200);
  };

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.overlayVisible : ''}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modal} ${visible ? styles.modalVisible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'done' ? (
          <p className={styles.thanks}>피드백 감사해요 🙏</p>
        ) : step === 'comment' ? (
          <>
            <div className={styles.body}>
              <div className={styles.icon}>
                <Image src="/logo.png" alt="Trip MOA" width={40} height={40} style={{ borderRadius: 8 }} />
              </div>
              <p className={styles.title}>어떤 점이 아쉬웠나요?</p>
              <p className={styles.subtitle}>더 나은 답변을 위해 의견을 남겨주세요.</p>
              <textarea
                className={styles.textarea}
                placeholder="자유롭게 적어주세요"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                autoFocus
              />
            </div>
            <div className={styles.divider} />
            <div className={styles.actions}>
              <button className={styles.btn} onClick={handleClose}>취소</button>
              <div className={styles.btnDivider} />
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={handleSubmit}
                disabled={!comment.trim()}
              >
                보내기
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.body}>
              <div className={styles.icon}>
                <Image src="/logo.png" alt="Trip MOA" width={40} height={40} style={{ borderRadius: 8 }} />
              </div>
              <p className={styles.title}>Trip MOA가 도움이{'\n'}됐나요?</p>
              <p className={styles.subtitle}>별표를 탭하여 답변을 평가해주세요.</p>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    className={`${styles.star} ${rating !== null && s <= rating ? styles.starFilled : ''}`}
                    onClick={() => setRating(s)}
                    aria-label={`${s}점`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.actions}>
              <button className={styles.btn} onClick={handleClose}>취소</button>
              <div className={styles.btnDivider} />
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={handleRatingNext}
                disabled={!rating}
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}