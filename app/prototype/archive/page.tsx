'use client';

import { useRouter } from 'next/navigation';
import styles from './archive.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { useToast } from '@/components/prototype/Toast';
import { useFavorites } from '@/components/prototype/FavoritesContext';

// ── Mock 데이터 ──────────────────────────────────────────────

const CATEGORY_COUNTS = [
  { label: '찜한목록', count: null as number | null, icon: 'heart', route: '/prototype/archive/favorites' },
  { label: '사진', count: 8, icon: 'photo', route: null },
  { label: '메모', count: 5, icon: 'memo', route: null },
  { label: '폴더', count: 3, icon: 'folder', route: null },
];

// 메모 카테고리는 기능 보류 → 더미 고정 유지
const MEMOS_DUMMY = [
  { id: 'm1', title: '구매해야 할 것', items: ['110V 돼지코'], date: '1일 전' },
  { id: 'm2', title: '기억해야 할 것', items: ['비짓 재팬 등록하기'], date: '1일 전' },
];

// 사진 카테고리는 별도 기능 미구현 → 더미 고정 유지
const PHOTO_DUMMY_ITEMS = [
  { id: 'p1', title: '오사카 맛집', meta: '4시간 전 · 사진', icon: 'photo', image: 'https://placehold.co/200x200/f7931e/ffffff?text=Food' },
  { id: 'p2', title: '오사카 디저트', meta: '4시간 전 · 사진', icon: 'photo', image: 'https://placehold.co/200x200/ff6b6b/ffffff?text=Dessert' },
];

const MY_FOLDERS = [
  { id: 'f1', name: '7월\n오사카 휴가', icon: '/file.svg' },
  { id: 'f2', name: '오사카\n액티비티', icon: '/file-1.svg' },
  { id: 'f3', name: '맛집 캡쳐', icon: '/file-2.svg' },
];

// ── 아이콘 ────────────────────────────────────────────────────

function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'heart':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 20.5s-7.5-4.6-9.8-9.1C.6 7.9 2.3 4.5 5.7 4c2-.3 3.8.6 4.9 2.1C11.6 4.6 13.4 3.7 15.4 4c3.4.5 5.1 3.9 3.5 7.4-2.3 4.5-9.8 9.1-9.8 9.1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'photo':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M3 16l5-4.5a2 2 0 0 1 2.6 0L15 15.5M14 14l1.4-1.3a2 2 0 0 1 2.7 0L21 15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'memo':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      );
    case 'folder':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        </svg>
      );
    case 'sparkle':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
      );
    case 'upload':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'plus':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    case 'chevron':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return null;
  }
}

// ── 컴포넌트 ──────────────────────────────────────────────────

export default function ArchivePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { favorites } = useFavorites();

  // 최근 추가한 항목: 찜한목록(실데이터, 최신순) + 사진(더미) 결합
  const recentFavoriteItems = favorites.slice(0, 4).map((f) => ({
    id: f.id,
    title: f.title,
    meta: `${f.date} · 찜한목록`,
    icon: 'heart' as const,
    image: f.image,
    route: '/prototype/archive/favorites',
  }));
  const recentItems = [
    ...recentFavoriteItems,
    ...PHOTO_DUMMY_ITEMS.map((p) => ({ ...p, route: null as string | null })),
  ].slice(0, 4);

  return (
    <main className={styles.screen}>
      {/* 헤더: 로고 */}
      <div className={styles.header}>
        <span className={styles.headerWordmark}>
          <span className={styles.wTrip}>Trip</span>
          <span className={styles.wMoa}> MOA</span>
        </span>
      </div>

      {/* 아카이브 타이틀 */}
      <div className={styles.titleSection}>
        <div className={styles.titleLeft}>
          <p className={styles.titleArchive}>아카이브</p>
          <p className={styles.titleSub}>나의 여행정보를 모아서 정리해보세요</p>
        </div>
      </div>

      {/* 분류 카드 (연한 배경 박스 안 4칸) */}
      <div className={styles.catPanel}>
        {CATEGORY_COUNTS.map(({ label, count, icon, route }) => {
          const displayCount = label === '찜한목록' ? favorites.length : count;
          return (
            <button
              key={label}
              className={styles.catCard}
              onClick={() => (route ? router.push(route) : showToast())}
            >
              <span className={styles.catIconWrap}>
                <Icon name={icon} className={styles.catIcon} />
              </span>
              <span className={styles.catLabel}>{label}</span>
              <span className={styles.catCount}>{displayCount}</span>
            </button>
          );
        })}
      </div>

      {/* 최근 추가한 항목 */}
      <section className={styles.section}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>최근 추가한 항목</h2>
          <button className={styles.seeAll} onClick={() => showToast()}>
            더보기 <Icon name="chevron" className={styles.seeAllIcon} />
          </button>
        </div>
        {recentItems.length === 0 ? (
          <div className={styles.recentEmptyBox}>아직 추가한 항목이 없어요</div>
        ) : (
          <div className={styles.recentScrollRow}>
            {recentItems.map((item) => (
              <div
                key={item.id}
                className={styles.recentCard}
                role="button"
                tabIndex={0}
                onClick={() => (item.route ? router.push(item.route) : showToast())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') (item.route ? router.push(item.route) : showToast());
                }}
              >
                <div className={styles.recentImgWrap}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className={styles.recentImg} />
                  ) : (
                    <div className={styles.recentImgPlaceholder}>
                      <Icon name={item.icon} className={styles.recentImgPlaceholderIcon} />
                    </div>
                  )}
                  <span className={styles.recentBadge}>
                    <Icon name={item.icon} className={styles.recentBadgeIcon} />
                  </span>
                </div>
                <p className={styles.recentTitle}>{item.title}</p>
                <p className={styles.recentMeta}>{item.meta}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AI 정리 배너 */}
      <button className={styles.aiBanner} onClick={() => showToast()}>
        <span className={styles.aiBannerMascot}>
          <img src="/moa.png" alt="MOA" className={styles.aiBannerMascotImg} />
        </span>
        <span className={styles.aiBannerText}>
          <span className={styles.aiBannerTitle}>MOA가 아카이브를 정리해드려요!</span>
          <span className={styles.aiBannerDesc}>비슷한 정보를 그룹으로 묶고, 필요한 정보를 바로 찾아보세요</span>
        </span>
        <span className={styles.aiBannerCta}>
          <Icon name="sparkle" className={styles.aiBannerCtaIcon} />
          AI 정리하기
        </span>
      </button>

      {/* 내 폴더 */}
      <section className={styles.section}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>내 폴더</h2>
          <button className={styles.seeAll} onClick={() => showToast()}>
            더보기 <Icon name="chevron" className={styles.seeAllIcon} />
          </button>
        </div>
        <div className={styles.folderScrollRow}>
          {MY_FOLDERS.map((folder) => (
            <div
              key={folder.id}
              className={styles.folderCard}
              role="button"
              tabIndex={0}
              onClick={() => showToast()}
              onKeyDown={(e) => { if (e.key === 'Enter') showToast(); }}
            >
              <img src={folder.icon} alt={folder.name.replace('\n', ' ')} className={styles.folderIconImg} />
              <p className={styles.folderName}>
                {folder.name.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < folder.name.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
          <div
            className={`${styles.folderCard} ${styles.folderAdd}`}
            role="button"
            tabIndex={0}
            onClick={() => showToast()}
            onKeyDown={(e) => { if (e.key === 'Enter') showToast(); }}
          >
            <div className={styles.folderAddIcon}>
              <Icon name="plus" className={styles.folderAddPlus} />
            </div>
            <p className={styles.folderName}>새폴더</p>
          </div>
        </div>
      </section>

      {/* 메모 */}
      <section className={styles.section}>
        <div className={styles.sectionRow}>
          <h2 className={styles.sectionTitle}>메모</h2>
          <button className={styles.seeAll} onClick={() => showToast()}>
            더보기 <Icon name="chevron" className={styles.seeAllIcon} />
          </button>
        </div>
        <div className={styles.scrollRow}>
          {MEMOS_DUMMY.map((memo) => (
            <div
              key={memo.id}
              className={styles.memoCard}
              role="button"
              tabIndex={0}
              onClick={() => showToast()}
              onKeyDown={(e) => { if (e.key === 'Enter') showToast(); }}
            >
              <p className={styles.memoTitle}>{memo.title}</p>
              <ul className={styles.memoList}>
                {memo.items.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <p className={styles.memoDate}>{memo.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 업로드 */}
      <button className={styles.uploadBtn} onClick={() => showToast()}>
        <Icon name="upload" className={styles.uploadIcon} />
        업로드 하기
      </button>

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}