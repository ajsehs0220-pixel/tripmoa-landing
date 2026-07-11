'use client';

import { useState } from 'react';
import styles from './chat.module.css';
import { trackEvent } from '@/lib/gtag';

interface Props {
  searchId: string;
  query?: string;
  city?: string;
}

export default function FeedbackForm({ searchId, query, city }: Props) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (rating === 0 || !searchId || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          search_id: searchId,
          rating,
          comment: comment.trim() || null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(
          typeof data.error === 'string' ? data.error : '피드백 제출에 실패했어요.'
        );
      }
      setSubmitted(true);
      trackEvent('submit_feedback', { rating, query, city });
    } catch (e) {
      console.error('피드백 제출 실패:', e);
      setError(e instanceof Error ? e.message : '피드백 제출에 실패했어요.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={styles.feedbackBlock}>
        <p className={styles.feedbackThanks}>피드백 감사합니다!</p>
      </div>
    );
  }

  const displayRating = hoverRating || rating;

  return (
    <div className={styles.feedbackBlock}>
      <p className={styles.feedbackLabel}>이 답변이 도움이 됐나요?</p>

      <div
        className={styles.feedbackStars}
        role="radiogroup"
        aria-label="별점 평가"
        onMouseLeave={() => setHoverRating(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star}점`}
            className={`${styles.feedbackStar} ${
              star <= displayRating ? styles.feedbackStarActive : styles.feedbackStarInactive
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className={styles.feedbackTextarea}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="의견을 남겨주세요 (선택)"
        rows={3}
      />

      {error && <p className={styles.feedbackError}>{error}</p>}

      <button
        type="button"
        className={styles.feedbackSubmit}
        onClick={handleSubmit}
        disabled={rating === 0 || !searchId || submitting}
      >
        {submitting ? '제출 중...' : '제출'}
      </button>
    </div>
  );
}
