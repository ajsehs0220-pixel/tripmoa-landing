'use client';

import { useRouter } from 'next/navigation';
import styles from './mypage.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import PageHeader from '@/components/prototype/PageHeader';
import { useToast } from '@/components/prototype/Toast';
import { useRecentViews } from '@/components/prototype/RecentViewContext';
import { trackEvent } from '@/lib/gtag';

const DUMMY_TRIP = {
  title: '오사카 여행 정보 탐색 중',
  thumbnail: '/mypage_thumbnail.png',
  lastEdited: '2시간 전',
  progress: 45,
  lastChat: '교토 버스투어 후기 알려줘!',
};

const TRAVEL_TAGS = ['오사카', '20대', '친구와', '3명이서', '핫플', '가성비'];
const CITY_TAGS = ['오사카', '시즈오카', '마쓰야마'];

const MENU_ITEMS = [
  {
    label: '공지사항',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="9" width="6" height="6" rx="1" />
        <path d="M8 9L17 4V20L8 15Z" />
        <path d="M11 15V20" />
        <path d="M19.5 9C20.8 9 21.5 10.3 21.5 12C21.5 13.7 20.8 15 19.5 15" />
      </svg>
    ),
  },
  {
    label: '계정관리',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
      </svg>
    ),
  },
  {
    label: '트립모아 인스타그램',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    href: 'https://www.instagram.com/tripmoa.kr/',
  },
];

export default function MyPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { recentViews } = useRecentViews();

  const recentTop3 = recentViews.slice(0, 3);

  return (
    <main className={styles.screen}>
      <PageHeader onClose={() => router.push('/prototype/home')} />

      {/* MY 타이틀 + 프로필/로그인 */}
      <div className={styles.titleSection}>
        <div className={styles.titleLeft}>
          <p className={styles.titleMy}>MY</p>
          <p className={styles.titleSub}>나만의 여행을 한곳에서 관리해보세요</p>
        </div>
        <button
          className={styles.profileLoginBtn}
          onClick={() => {
            trackEvent('click_login');
            showToast('로그인 기능은 준비 중입니다');
          }}
          aria-label="로그인"
        >
          <span className={styles.profileAvatar}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#b0b8c2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
            </svg>
          </span>
          <span className={styles.loginLabel}>로그인</span>
        </button>
      </div>

      {/* 진행중인 여행 */}
      <section className={styles.section}>
        <div className={styles.tripCard}>
          <img src={DUMMY_TRIP.thumbnail} alt={DUMMY_TRIP.title} className={styles.tripThumb} />
          <div className={styles.tripRight}>
            <div className={styles.tripTitleRow}>
              <p className={styles.tripTitle}>{DUMMY_TRIP.title}</p>
              <div className={styles.tripDateRow}>
                <p className={styles.tripDate}>마지막 수정 {DUMMY_TRIP.lastEdited}</p>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: `${DUMMY_TRIP.progress}%` }} />
                </div>
              </div>
            </div>

            <div className={styles.tripChatBubble}>
              <span className={styles.tripChatIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <span className={styles.tripChatText}>
                <span className={styles.tripChatLabel}>최근대화</span>
                <span className={styles.tripChatQuote}>&ldquo;{DUMMY_TRIP.lastChat}&rdquo;</span>
              </span>
            </div>

            <div className={styles.tripActionRow}>
              <button
                className={styles.continueChatBtn}
                onClick={() => showToast('로그인 기능은 준비 중입니다')}
              >
                채팅이어하기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 최근 본 정보 */}
      <section className={styles.section}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            최근 본 정보
          </h2>
          {recentTop3.length > 0 && (
            <button className={styles.seeAll} onClick={() => router.push('/prototype/mypage/recent')}>
              전체보기
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {recentTop3.length === 0 ? (
          <div className={styles.emptyBox}>아직 본 정보가 없어요</div>
        ) : (
          <div className={styles.recentScroll}>
            {recentTop3.map((item) => (
              <button
                key={item.id}
                className={styles.recentCard}
                onClick={() => {
                  trackEvent('click_recent_card', { id: item.id, title: item.title });
                  if (!item.path) return;
                  if (item.path.startsWith('http')) {
                    window.open(item.path, '_blank', 'noopener,noreferrer');
                  } else {
                    router.push(item.path);
                  }
                }}
              >
                <div className={styles.recentImgWrap}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className={styles.recentImg} />
                  ) : (
                    <div className={styles.recentImgPlaceholder}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="16.5" y1="16.5" x2="21" y2="21" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className={styles.recentTitle}>{item.title}</p>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 내 탐색 */}
      <section className={styles.section}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            내 탐색
          </h2>
          <button className={styles.seeAll} onClick={() => showToast('수정 기능은 준비 중입니다')}>
            수정하기
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className={styles.exploreBox}>
          <p className={styles.exploreLabel}>나의 여행 취향</p>
          <div className={styles.chipsWrap}>
            {TRAVEL_TAGS.map((tag) => (
              <span
                key={tag}
                className={CITY_TAGS.includes(tag) ? `${styles.chip} ${styles.chipAccent}` : styles.chip}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 메뉴 리스트 */}
      <section className={styles.section}>
        <div className={styles.menuList}>
          {MENU_ITEMS.map(({ label, icon, href }) => (
            <button
              key={label}
              className={styles.menuItem}
              onClick={() => {
                trackEvent('click_menu_item', { label });
                if (href) {
                  window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                  showToast('준비 중인 기능입니다');
                }
              }}
            >
              <span className={styles.menuIcon}>{icon}</span>
              <span className={styles.menuLabel}>{label}</span>
              <svg className={styles.menuChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </section>

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}