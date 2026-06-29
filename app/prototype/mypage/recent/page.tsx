'use client';

import { useRouter } from 'next/navigation';
import styles from './recent.module.css';
import { useRecentViews } from '@/components/prototype/RecentViewContext';

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function RecentViewsPage() {
  const router = useRouter();
  const { recentViews, removeRecentView, clearRecentViews } = useRecentViews();

  return (
    <main className={styles.screen}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/prototype/mypage')} aria-label="뒤로가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className={styles.headerTitle}>최근 본 정보</h1>
      </div>

      <div className={styles.topRow}>
        <span className={styles.countText}>{recentViews.length}개</span>
        {recentViews.length > 0 && (
          <button className={styles.clearAllBtn} onClick={clearRecentViews}>
            전체 비우기
          </button>
        )}
      </div>

      {recentViews.length === 0 ? (
        <div className={styles.emptyWrap}>
          <p className={styles.emptyText}>아직 본 정보가 없어요</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {recentViews.map((item) => (
            <div key={item.id} className={styles.card}>
              <button
                className={styles.deleteBtn}
                aria-label="삭제"
                onClick={() => removeRecentView(item.id)}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <button
                className={styles.cardLink}
                onClick={() => {
                  if (!item.path) return;
                  if (item.path.startsWith('http')) {
                    window.open(item.path, '_blank', 'noopener,noreferrer');
                  } else {
                    router.push(item.path);
                  }
                }}
              >
                <div className={styles.imgWrap}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className={styles.img} />
                  ) : (
                    <div className={styles.imgPlaceholder}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className={styles.date}>{formatDate(item.viewedAt)}</p>
                <p className={styles.title}>{item.title}</p>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.bottomPad} />
    </main>
  );
}
