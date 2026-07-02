'use client';

import { useRouter } from 'next/navigation';
import styles from './chatlikes.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { useChatLikes } from '@/components/prototype/ChatLikesContext';
import { IconThumbUp } from '@/components/chat/MessageToolbar';
import { trackEvent } from '@/lib/gtag';

export default function ChatLikesPage() {
  const router = useRouter();
  const { chatLikes, removeChatLike } = useChatLikes();

  return (
    <main className={styles.screen}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/prototype/archive')} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className={styles.headerTitle}>좋아요한 채팅</h1>
      </div>

      <p className={styles.countText}>{chatLikes.length}개</p>

      {/* 리스트 */}
      {chatLikes.length === 0 ? (
        <p className={styles.emptyText}>아직 좋아요한 채팅이 없어요.</p>
      ) : (
        <div className={styles.list}>
          {chatLikes.map((item) => (
            <div
              key={item.id}
              className={styles.item}
              onClick={() => {
                trackEvent('click_archived_chat', { id: item.id, query: item.query, city: item.city });
                const params = new URLSearchParams({ q: item.query });
                if (item.city) params.set('city', item.city);
                router.push(`/prototype/result?${params.toString()}`);
              }}
              role="link"
              tabIndex={0}
            >
              <div className={styles.itemIconCol}>
                <svg className={styles.itemIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V16H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  <circle cx="8.5" cy="10.5" r="1" fill="currentColor"/>
                  <circle cx="12" cy="10.5" r="1" fill="currentColor"/>
                  <circle cx="15.5" cy="10.5" r="1" fill="currentColor"/>
                </svg>
                <span className={styles.itemCityLabel}>{item.city || '채팅'}</span>
              </div>
              <div className={styles.itemBody}>
                <span className={styles.itemDate}>{item.date.slice(0, 10)}</span>
                <p className={styles.itemTitle}>{item.query}</p>
                <p className={styles.itemSubtitle}>{item.summary}</p>
              </div>
              <button
                className={styles.thumbBtn}
                aria-label="좋아요 해제"
                onClick={(e) => {
                  e.stopPropagation();
                  removeChatLike(item.id);
                }}
              >
                <IconThumbUp filled />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}