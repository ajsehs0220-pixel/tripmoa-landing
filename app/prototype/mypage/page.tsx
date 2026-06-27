'use client';

import styles from './mypage.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { useToast } from '@/components/prototype/Toast';

const DUMMY_TRIP = {
  title: '오사카 2박 3일 여행',
  thumbnail: '/mypage_thumbnail.png',
};

const MENU_ITEMS = [
  { label: '내 여행 기록', emoji: '🗺️' },
  { label: '알림 설정', emoji: '🔔' },
  { label: '앱 설정', emoji: '⚙️' },
  { label: '고객센터', emoji: '💬' },
];

export default function MyPage() {
  const { showToast } = useToast();

  return (
    <main className={styles.screen}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>My Page</h1>
      </div>

      {/* 프로필 영역 */}
      <div className={styles.profileSection}>
        <div className={styles.profileAvatar}>
          <img src="/persona.svg" alt="프로필" width="72" height="72" />
        </div>
        <div className={styles.profileInfo}>
          <p className={styles.profileName}>지수님</p>
        </div>
        <button className={styles.loginChip} onClick={() => showToast()}>로그아웃</button>
      </div>

      {/* 진행중인 여행 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>진행중인 여행</h2>
        <div className={styles.tripCard}>
          <img src={DUMMY_TRIP.thumbnail} alt={DUMMY_TRIP.title} className={styles.tripThumb} />
          <div className={styles.tripBody}>
            <p className={styles.tripTitle}>{DUMMY_TRIP.title}</p>
            <p className={styles.tripDate}>마지막 수정 2시간 전</p>
          </div>
          <button className={styles.updateBtn} onClick={() => showToast()}>채팅이어하기</button>
        </div>
      </section>

      {/* 메뉴 목록 */}
      <section className={styles.section}>
        <div className={styles.menuList}>
          {MENU_ITEMS.map(({ label, emoji }) => (
            <button key={label} className={styles.menuItem} onClick={() => showToast()}>
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
          href="https://www.instagram.com/tripmoa.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.instaBox}
        >
          <div className={styles.instaIconWrap}>
            <img src="/instagram.svg" alt="Instagram" width="44" height="44" />
          </div>
          <div className={styles.instaBody}>
            <p className={styles.instaTitle}>Trip MOA 공식계정</p>
            <p className={styles.instaSub}>@tripmoa.kr · 팔로우하고 여행정보 추천받기</p>
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
