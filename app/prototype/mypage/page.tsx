'use client';

import styles from './mypage.module.css';
import BottomNav from '@/components/prototype/BottomNav';

const DUMMY_TRIP = {
  title: '마쓰야마 & 시코쿠 힐링 여행',
  thumbnail: 'https://placehold.co/80x80/28c5f0/ffffff?text=Matsuyama',
  lastModified: '2026.06.22 오후 3:42',
};

const MENU_ITEMS = [
  { label: '내 여행 기록', emoji: '🗺️' },
  { label: '알림 설정', emoji: '🔔' },
  { label: '앱 설정', emoji: '⚙️' },
  { label: '고객센터', emoji: '💬' },
];

export default function MyPage() {
  return (
    <main className={styles.screen}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>마이</h1>
      </div>

      {/* 프로필 영역 */}
      <div className={styles.profileSection}>
        <div className={styles.profileAvatar}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b0b8c2"
            strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div className={styles.profileInfo}>
          <p className={styles.profileName}>OOO님</p>
          <p className={styles.profileSub}>로그인하고 더 많은 기능을 이용해보세요</p>
        </div>
        <button className={styles.loginChip}>로그인</button>
      </div>

      {/* 진행중인 여행 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>진행중인 여행</h2>
        <div className={styles.tripCard}>
          <img src={DUMMY_TRIP.thumbnail} alt={DUMMY_TRIP.title} className={styles.tripThumb} />
          <div className={styles.tripBody}>
            <p className={styles.tripTitle}>{DUMMY_TRIP.title}</p>
            <p className={styles.tripDate}>마지막 수정 {DUMMY_TRIP.lastModified}</p>
          </div>
          <button className={styles.updateBtn}>업데이트</button>
        </div>
      </section>

      {/* 메뉴 목록 */}
      <section className={styles.section}>
        <div className={styles.menuList}>
          {MENU_ITEMS.map(({ label, emoji }) => (
            <button key={label} className={styles.menuItem}>
              <span className={styles.menuEmoji}>{emoji}</span>
              <span className={styles.menuLabel}>{label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b0b8c2"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </section>

      {/* 인스타그램 링크 박스 */}
      <section className={styles.section}>
        <a
          href="https://instagram.com/tripmoa_official"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.instaBox}
        >
          <div className={styles.instaIconWrap}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <div className={styles.instaBody}>
            <p className={styles.instaTitle}>트립모아 인스타그램</p>
            <p className={styles.instaSub}>@tripmoa_official · 팔로우하고 여행 인사이트 받기</p>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b0b8c2"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </section>

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}
