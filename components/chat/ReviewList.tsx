'use client';

import styles from './chat.module.css';
import RenderContent from './RenderContent';
import RefBadge from './RefBadge';
import type { Review } from './types';
import { pickPlaceReviews } from './reviewUtils';

function parseReviewDisplay(text: string, refField?: number) {
  const inlineRefs = [...(text ?? '').matchAll(/\[ref:(\d+)\]/g)].map((m) => Number(m[1]));
  const body = (text ?? '').replace(/\s*(?:\[ref:\d+\])+/g, '').trim();
  const refId = inlineRefs[0] ?? (refField != null ? refField : undefined);
  return { body, refId };
}

interface Props {
  reviews: Review[] | null | undefined;
  onRefClick: (id: number) => void;
  placeName?: string;
  description?: string;
}

export default function ReviewList({ reviews, onRefClick, placeName, description }: Props) {
  if (!reviews || reviews.length === 0) return null;

  const visible = pickPlaceReviews(reviews, { placeName, description });

  return (
    <div className={styles.reviewList}>
      {visible.map((review, i) => {
        const { body, refId } = parseReviewDisplay(review.text ?? '', review.ref);

        return (
          <blockquote
            key={i}
            className={`${styles.reviewCard} ${
              review.sentiment === 'negative' ? styles.reviewNegative : styles.reviewPositive
            }`}
          >
            <p className={styles.reviewText}>
              <span className={styles.reviewEmoji} aria-hidden="true">
                {review.sentiment === 'negative' ? '😅' : '😊'}
              </span>
              <span className={styles.reviewQuote}>
                <span className={styles.reviewQuoteMark} aria-hidden="true">&quot;</span>
                <span className={styles.reviewQuoteBody}>
                  <RenderContent content={body} onRefClick={onRefClick} plainBold />
                </span>
                <span className={styles.reviewQuoteMark} aria-hidden="true">&quot;</span>
                {refId != null && (
                  <span className={styles.reviewQuoteRef}>
                    <RefBadge id={refId} onClick={() => onRefClick(refId)} />
                  </span>
                )}
              </span>
            </p>
            {review.date && (
              <footer className={styles.reviewMeta}>
                <span className={styles.reviewDate}>{review.date}</span>
              </footer>
            )}
          </blockquote>
        );
      })}
    </div>
  );
}
