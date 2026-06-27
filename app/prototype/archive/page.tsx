'use client';

import { useRouter } from 'next/navigation';
import styles from './archive.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { useToast } from '@/components/prototype/Toast';

// ── Mock 데이터 ──────────────────────────────────────────────

const CATEGORY_COUNTS = [
  { label: '찜한목록', count: 12, emoji: '❤️', route: '/prototype/archive/favorites' },
  { label: '갤러리', count: 8, emoji: '🖼️', route: null },
  { label: '여행정보', count: 5, emoji: '📋', route: null },
  { label: '폴더', count: 3, emoji: '📁', route: null },
];

const RECENT_ITEMS = [
  { id: 'r1', title: '도고 온천 본관', date: '2026.06.20', category: 'SNS스팟', image: 'https://placehold.co/120x90/28c5f0/ffffff?text=Dogo' },
  { id: 'r2', title: '이치란 라멘', date: '2026.06.18', category: '맛집', image: 'https://placehold.co/120x90/f7931e/ffffff?text=Ramen' },
  { id: 'r3', title: '마쓰야마성', date: '2026.06.15', category: '찜한목록', image: 'https://placehold.co/120x90/6f86f5/ffffff?text=Castle' },
  { id: 'r4', title: '후시미이나리 신사', date: '2026.06.12', category: '갤러리', image: 'https://placehold.co/120x90/28b77f/ffffff?text=Inari' },
  { id: 'r5', title: '오사카 3박4일 코스', date: '2026.06.09', category: '추천일정', image: 'https://placehold.co/120x90/005f80/ffffff?text=Course' },
];

const MY_FOLDERS = [
  { id: 'f1', name: '오사카 여행', count: 8 },
  { id: 'f2', name: '마쓰야마 계획', count: 4 },
  { id: 'f3', name: '힐링 여행', count: 6 },
];

const COLLECTIONS = [
  { id: 'c1', title: '일본 온천 베스트', count: 12, cover: 'https://placehold.co/200x130/28c5f0/ffffff?text=Onsen' },
  { id: 'c2', title: '시코쿠 숨은 명소', count: 7, cover: 'https://placehold.co/200x130/6f86f5/ffffff?text=Shikoku' },
  { id: 'c3', title: '맛집 지도', count: 15, cover: 'https://placehold.co/200x130/f7931e/ffffff?text=Food+Map' },
  { id: 'c4', title: '가성비 숙소 모음', count: 9, cover: 'https://placehold.co/200x130/005f80/ffffff?text=Budget' },
];

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  'SNS스팟':   { bg: '#eafaff', color: '#0c9ed1' },
  '맛집':      { bg: '#fff4e6', color: '#e27000' },
  '찜한목록':  { bg: '#fff0f3', color: '#d63384' },
  '갤러리':    { bg: '#f0f0ff', color: '#6f86f5' },
  '추천일정':  { bg: '#e9f7ec', color: '#2e9e4f' },
};

// ── 컴포넌트 ──────────────────────────────────────────────────

export default function ArchivePage() {
  const router = useRouter();
  const { showToast } = useToast();

  return (
    <main className={styles.screen}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>아카이브</h1>
      </div>

      {/* 분류 카운트 카드 2×2 */}
      <div className={styles.catGrid}>
        {CATEGORY_COUNTS.map(({ label, count, emoji, route }) => (
          <button
            key={label}
            className={styles.catCard}
            onClick={() => (route ? router.push(route) : showToast())}
          >
            <span className={styles.catEmoji}>{emoji}</span>
            <span className={styles.catCount}>{count}</span>
            <span className={styles.catLabel}>{label}</span>
          </button>
        ))}
      </div>

      {/* 최근 추가한 항목 */}
      <section className={styles.section}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>최근 추가한 항목</h2>
          <button className={styles.seeAll} onClick={() => showToast()}>전체보기</button>
        </div>
        <div className={styles.scrollRow}>
          {RECENT_ITEMS.map((item) => {
            const badge = BADGE_STYLES[item.category] ?? { bg: '#f0f1f3', color: '#6b7280' };
            return (
              <div
                key={item.id}
                className={styles.recentCard}
                role="button"
                tabIndex={0}
                onClick={() => showToast()}
                onKeyDown={(e) => { if (e.key === 'Enter') showToast(); }}
              >
                <img src={item.image} alt={item.title} className={styles.recentImg} />
                <div className={styles.recentBody}>
                  <span className={styles.recentBadge} style={{ background: badge.bg, color: badge.color }}>
                    {item.category}
                  </span>
                  <p className={styles.recentTitle}>{item.title}</p>
                  <p className={styles.recentDate}>{item.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 내 폴더 */}
      <section className={styles.section}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>내 폴더</h2>
          <button className={styles.seeAll} onClick={() => showToast()}>전체보기</button>
        </div>
        <div className={styles.scrollRow}>
          {MY_FOLDERS.map((folder) => (
            <div
              key={folder.id}
              className={styles.folderCard}
              role="button"
              tabIndex={0}
              onClick={() => showToast()}
              onKeyDown={(e) => { if (e.key === 'Enter') showToast(); }}
            >
              <div className={styles.folderIconWrap}>📁</div>
              <p className={styles.folderName}>{folder.name}</p>
              <p className={styles.folderCount}>{folder.count}개</p>
            </div>
          ))}
          <div
            className={`${styles.folderCard} ${styles.folderAdd}`}
            role="button"
            tabIndex={0}
            onClick={() => showToast()}
            onKeyDown={(e) => { if (e.key === 'Enter') showToast(); }}
          >
            <div className={`${styles.folderIconWrap} ${styles.folderAddIcon}`}>+</div>
            <p className={styles.folderName}>새 폴더 만들기</p>
          </div>
        </div>
      </section>

      {/* 컬렉션 */}
      <section className={styles.section}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>컬렉션</h2>
          <button className={styles.seeAll} onClick={() => showToast()}>전체보기</button>
        </div>
        <div className={styles.scrollRow}>
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              className={styles.collCard}
              role="button"
              tabIndex={0}
              onClick={() => showToast()}
              onKeyDown={(e) => { if (e.key === 'Enter') showToast(); }}
            >
              <img src={col.cover} alt={col.title} className={styles.collImg} />
              <p className={styles.collTitle}>{col.title}</p>
              <p className={styles.collCount}>{col.count}개</p>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}
