'use client';

import styles from './chat.module.css';
import MessageToolbarBar from './MessageToolbarBar';
import { IconCopy } from './MessageToolbar';
import { formatQueryForCopy } from './formatAnswerForCopy';
import { trackEvent } from '@/lib/gtag';

interface Props {
  query: string;
  city?: string;
}

export default function UserMessage({ query, city }: Props) {
  const copyText = formatQueryForCopy(query, city);

  return (
    <div className={styles.userRow}>
      <div className={styles.userRowInner}>
        <div className={styles.userBubble}>
          {city && <span className={styles.cityTag}>[{city}]</span>}
          {query}
        </div>
        <MessageToolbarBar
          align="end"
          actions={[
            {
              id: 'copy',
              icon: <IconCopy />,
              label: '복사',
              feedbackLabel: '복사됨',
              onClick: async () => {
                trackEvent('click_user_message_copy', { query, city });
                await navigator.clipboard.writeText(copyText);
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
