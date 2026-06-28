'use client';

import { useRouter } from 'next/navigation';
import styles from './favorites.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { useFavorites } from '@/components/prototype/FavoritesContext';

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  'SNS스팟':   { bg: '#EFFBFE', color: '#6E6D6D' },
  '맛집':      { bg: '#EFFBFE', color: '#6E6D6D' },
  '찜한목록':  { bg: '#EFFBFE', color: '#6E6D6D' },
  '갤러리':    { bg: '#EFFBFE', color: '#6E6D6D' },
  '추천일정':  { bg: '#EFFBFE', color: '#6E6D6D' },
  '숙소':      { bg: '#EFFBFE', color: '#6E6D6D' },
};

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites, removeFavorite } = useFavorites();

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
        <h1 className={styles.headerTitle}>찜한 목록</h1>
      </div>

      <p className={styles.countText}>{favorites.length}개</p>

      {/* 리스트 */}
      {favorites.length === 0 ? (
        <p className={styles.emptyText}>아직 찜한 항목이 없어요.</p>
      ) : (
        <div className={styles.list}>
          {favorites.map((item) => {
            const badge = BADGE_STYLES[item.category] ?? { bg: '#f0f1f3', color: '#6b7280' };
            return (
              <div key={item.id} className={styles.item}>
                <img src={item.image ?? undefined} alt={item.title} className={styles.itemImg} />
                <div className={styles.itemBody}>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemBadge} style={{ background: badge.bg, color: badge.color }}>
                      {item.category}
                    </span>
                    <span className={styles.itemDate}>{item.date}</span>
                  </div>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemSubtitle}>{item.subtitle}</p>
                </div>
                <button
                  className={styles.heartBtn}
                  aria-label="찜 해제"
                  onClick={() => removeFavorite(item.id)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#28c5f0" stroke="#28c5f0" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}