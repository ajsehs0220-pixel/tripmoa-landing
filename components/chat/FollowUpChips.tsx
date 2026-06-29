'use client';

import styles from './chat.module.css';

interface Props {
  questions: string[];
  onSelect: (q: string) => void;
}

export default function FollowUpChips({ questions, onSelect }: Props) {
  if (questions.length === 0) return null;

  return (
    <div className={styles.followUpBlock}>
      <p className={styles.followUpLabel}>이런 것도 궁금하지 않아요?</p>
      <div className={styles.followUpList}>
        {questions.map((q, i) => (
          <button
            key={i}
            type="button"
            className={styles.followUpItem}
            onClick={() => onSelect(q)}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}