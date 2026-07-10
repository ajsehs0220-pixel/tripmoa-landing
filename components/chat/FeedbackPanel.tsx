'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose?.(), 250);
  };

  const handleSubmit = async () => {
    if (!rating) return;
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
    setDone(true);
    setTimeout(() => handleClose(), 1500);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={!rating ? handleClose : undefined}
    >
      <div className={`${styles.overlayInner} ${visible ? styles.overlayInnerVisible : ''}`}>
        <div
          className={`${styles.modal} ${visible ? styles.modalVisible : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {done ? (
            /* 완료 */
            <div className={styles.body}>
              <div className={styles.icon}>
                <Image src="/logo.png" alt="Trip MOA" width={56} height={56} style={{ borderRadius: 14 }} />
              </div>
              <p className={styles.title}>피드백을 보내주셔서{'\n'}감사합니다.</p>
              <p className={styles.subtitle}>더 나은 서비스로 보답하겠습니다.</p>
              <div className={styles.stars}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className={`${styles.star} ${rating !== null && s <= rating ? styles.starDone : ''}`}>★</span>
                ))}
              </div>
            </div>
          ) : (
            /* 메인 — 별점 + 텍스트 한 화면 */
            <>
              <div className={styles.body}>
                <div className={styles.icon}>
                  <Image src="/logo.png" alt="Trip MOA" width={56} height={56} style={{ borderRadius: 14 }} />
                </div>
                <p className={styles.title}>Trip MOA 베타 사용 후기를{'\n'}남겨주세요</p>
                <p className={styles.subtitle}>서비스 개선에 큰 도움이 됩니다.</p>
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
                <textarea
                  className={styles.textarea}
                  placeholder="의견을 자유롭게 적어주세요"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>
              <div className={styles.actionsColumn}>
                <button
                  className={styles.btnPill}
                  onClick={handleSubmit}
                  disabled={!rating || !comment.trim()}
                >
                  보내기
                </button>
                <button className={styles.btnPillGhost} onClick={handleClose}>
                  지금 안 함
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}