'use client';

import { useRouter } from 'next/navigation';
import styles from './recent.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { useFavorites } from '@/components/prototype/FavoritesContext';
import { useChatLikes } from '@/components/prototype/ChatLikesContext';
import { trackEvent } from '@/lib/gtag';

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V16H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
        stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="8.5" cy="10.5" r="1" fill="currentColor"/>
      <circle cx="12" cy="10.5" r="1" fill="currentColor"/>
      <circle cx="15.5" cy="10.5" r="1" fill="currentColor"/>
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 7.9 2.3 4.5 5.7 4c2-.3 3.8.6 4.9 2.1C11.6 4.6 13.4 3.7 15.4 4c3.4.5 5.1 3.9 3.5 7.4-2.3 4.5-9.8 9.1-9.8 9.1z"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function RecentArchivePage() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { chatLikes } = useChatLikes();

  const items = [
    ...favorites.map((f) => ({
      id: f.id,
      title: f.title,
      subtitle: '',
      type: 'favorite' as const,
      image: f.image as string | undefined,
      city: undefined as string | undefined,
      date: f.date,
      route: '/prototype/archive/favorites',
    })),
    ...chatLikes.map((c) => ({
      id: c.id,
      title: c.query,
      subtitle: c.summary,
      type: 'chat' as const,
      image: c.image,
      city: c.city,
      date: c.date,
      route: `/prototype/result?q=${encodeURIComponent(c.query)}${c.city ? `&city=${encodeURIComponent(c.city)}` : ''}`,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/prototype/archive')} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className={styles.headerTitle}>최근 추가한 항목</h1>
      </div>

      <p className={styles.countText}>{items.length}개</p>

      {items.length === 0 ? (
        <p className={styles.emptyText}>아직 추가한 항목이 없어요.</p>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <div
              key={item.id}
              className={styles.item}
              role="link"
              tabIndex={0}
              onClick={() => {
                trackEvent('click_archive_recent_item', { id: item.id, type: item.type });
                router.push(item.route);
              }}
              onKeyDown={(e) => { if (e.key === 'Enter') router.push(item.route); }}
            >
              {/* 썸네일 */}
              <div className={styles.thumb}>
                {item.image ? (
                  <img src={item.image} alt={item.title} className={styles.thumbImg} />
                ) : (
                  <div className={styles.thumbPlaceholder}>
                    {item.type === 'chat'
                      ? <ChatIcon className={styles.thumbIcon} />
                      : <HeartIcon className={styles.thumbIcon} />}
                  </div>
                )}
              </div>

              {/* 본문 */}
              <div className={styles.itemBody}>
                <span className={styles.itemDate}>
                  {item.date.slice(0, 10)} · {item.type === 'chat' ? '채팅 좋아요' : '찜한목록'}
                  {item.city ? ` · ${item.city}` : ''}
                </span>
                <p className={styles.itemTitle}>{item.title}</p>
                {item.subtitle && <p className={styles.itemSubtitle}>{item.subtitle}</p>}
              </div>

              {/* 타입 뱃지 */}
              <span className={styles.typeBadge}>
                {item.type === 'chat'
                  ? <ChatIcon className={styles.badgeIcon} />
                  : <HeartIcon className={styles.badgeIcon} />}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}
