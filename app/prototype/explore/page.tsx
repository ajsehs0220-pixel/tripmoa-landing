'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './explore.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import PageHeader from '@/components/prototype/PageHeader';
import { getExploreMock, ExploreCard, ExploreResult } from '@/lib/exploreMock';
import { useToast } from '@/components/prototype/Toast';
import { useFavorites } from '@/components/prototype/FavoritesContext';
import { useRecentViews } from '@/components/prototype/RecentViewContext';

// ── 단계 데이터 ──────────────────────────────────────────────

type StepKey = 'city' | 'duration' | 'companion' | 'groupSize' | 'concept' | 'budget';

const STEP_KEYS: StepKey[] = ['city', 'duration', 'companion', 'groupSize', 'concept', 'budget'];

const STEP_QUESTIONS: Array<null | { badge: string; title: string; options: string[] }> = [
  null,
  { badge: 'STEP 1. 여행기간', title: '여행 기간은 어느 정도인가요?', options: ['3일 이하', '5일 이하', '일주일 이상', '3주 이상'] },
  { badge: 'STEP 2. 누구와?', title: '누구와 함께 가시나요?', options: ['나 혼자', '친구와', '아이와', '10대와', '연인과', '동료와', '부모님과', '조부모님과'] },
  { badge: 'STEP 3. 몇명이서?', title: '몇 명이서 가시나요?', options: ['1명~4명', '5명 이상', '10인 이하', '10인 이상', '단체'] },
  { badge: 'STEP 4. 여행 컨셉', title: '어떤 여행 컨셉인가요?', options: ['식도락', '힐링', '핫플', '액티비티'] },
  { badge: 'STEP 5. 예산', title: '예산은 어느 정도인가요?', options: ['가성비', '밸런스', '럭셔리'] },
];

const CITIES = ['오사카', '시즈오카', '마쓰야마'];

const CITY_EN: Record<string, string> = {
  오사카: 'Osaka',
  시즈오카: 'Sizoka',
  마쓰야마: 'Matsuyama',
};

const CITY_DESC: Record<string, string> = {
  오사카: '맛있는 음식과 역사적 랜드마크',
  시즈오카: '맛있는 음식과 역사적 랜드마크',
  마쓰야마: '맛있는 음식과 역사적 랜드마크',
};

const CITY_IMAGES: Record<string, string> = {
  오사카: '/exploreCity1.png',
  시즈오카: '/exploreCity2.png',
  마쓰야마: '/exploreCity3.png',
};

const COMING_SOON = [
  { name: 'Paris', image: '/ExploreMain2-Paris.png' },
  { name: 'Danang', image: '/ExploreMain2-Danang.png' },
  { name: 'Bangkok', image: '/ExploreMain2-Bangkok.png' },
];

const LOADING_IMAGES: Record<string, string> = {
  오사카: '/BrowseLoadingSpinner-Osaka.png',
  시즈오카: '/BrowseLoadingSpinner-Shizuoka.png',
  마쓰야마: '/BrowseLoadingSpinner-Matsuyama.png',
};

const CATEGORIES: { key: keyof ExploreResult; label: string }[] = [
  { key: 'itinerary', label: '추천일정' },
  { key: 'lodging', label: '숙소' },
  { key: 'snsSpots', label: 'SNS스팟' },
  { key: 'restaurants', label: '맛집' },
];

type Selections = Record<StepKey, string>;

const INITIAL_SELECTIONS: Selections = {
  city: '', duration: '', companion: '', groupSize: '', concept: '', budget: '',
};

// ── 컴포넌트 ─────────────────────────────────────────────────

export default function ExplorePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { isFavorited, toggleFavorite } = useFavorites();
  const { addRecentView } = useRecentViews();
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<'steps' | 'loading' | 'result'>('steps');
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComingSoon, setSelectedComingSoon] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== 'loading') return;
    const id = setTimeout(() => setPhase('result'), 4500);
    return () => clearTimeout(id);
  }, [phase]);

  function handleCitySelect(city: string) {
    setSelections((prev) => ({ ...prev, city }));
    setStep(1);
  }

  function handleOptionSelect(value: string) {
    const key = STEP_KEYS[step];
    setSelections((prev) => ({ ...prev, [key]: value }));
    if (step < 5) {
      setStep((s) => s + 1);
    } else {
      setPhase('loading');
    }
  }

  function handleBack() {
    if (step === 0) {
      router.push('/prototype/home');
    } else {
      setStep((s) => s - 1);
    }
  }

  function handleReset() {
    setPhase('steps');
    setStep(0);
    setSelections(INITIAL_SELECTIONS);
    setSearchQuery('');
  }

  function handleSearch() {
    const q = searchQuery.trim();
    if (!q) return;
    const params = new URLSearchParams({ q });
    if (selections.city) params.set('city', selections.city);
    router.push(`/prototype/result?${params.toString()}`);
  }

  // ── 로딩 화면 ────────────────────────────────────────────
  if (phase === 'loading') {
    const city = selections.city;
    const bgImage = LOADING_IMAGES[city] ?? LOADING_IMAGES['오사카'];

    return (
      <div className={styles.loadingScreen}>
        <img src={bgImage} alt={city} className={styles.loadingBgImg} />
        <div className={styles.loadingDim} />
        <div className={styles.loadingRing}>
          <span className={styles.loadingCityName}>{CITY_EN[city] ?? city}</span>
        </div>
        <div className={styles.loadingTextWrap}>
          <p className={styles.loadingText}>당신을 위한 여행을 설계하고 있어요</p>
        </div>
      </div>
    );
  }

  // ── 결과 화면 (mock 카테고리 카드 + 재검색 바) ──────────────
  if (phase === 'result') {
    const result = getExploreMock(selections.city, selections.concept);
    const tags = STEP_KEYS.map((k) => selections[k]).filter(Boolean);

    return (
      <main className={styles.screen}>
        <PageHeader onBack={handleReset} backLabel="처음으로" />

        {/* 재검색 바 */}
        <div className={styles.searchBar}>
          <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="예) 오사카 2박3일 맛집 여행"
            enterKeyHint="search"
          />
          <button
            className={styles.submitBtn}
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            aria-label="검색"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.5l1.9 5.4a3 3 0 001.8 1.8l5.4 1.9-5.4 1.9a3 3 0 00-1.8 1.8L12 20.7l-1.9-5.4a3 3 0 00-1.8-1.8L2.9 11.6l5.4-1.9a3 3 0 001.8-1.8L12 2.5z" />
            </svg>
          </button>
        </div>

        {/* 선택 태그 */}
        <div className={styles.tagsWrap}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>#{t}</span>
          ))}
        </div>

        {/* 카테고리별 카드 */}
        {CATEGORIES.map(({ key, label }) => (
          <section key={key} className={styles.section}>
            <h2 className={styles.sectionTitle}>{label}</h2>
            <div className={styles.cardRow}>
              {(result[key] as ExploreCard[]).map((card) => {
                const favorited = isFavorited(card.id);
                return (
                  <div
                    key={card.id}
                    className={styles.card}
                    onClick={() => {
                      addRecentView({
                        id: card.id,
                        title: card.title,
                        image: card.image,
                        path: card.link ?? '',
                      });
                      if (card.link) window.open(card.link, '_blank', 'noopener,noreferrer');
                    }}
                    role="link"
                    tabIndex={0}
                  >
                    <div className={styles.cardImgWrap}>
                      <img src={card.image ?? undefined} alt={card.title} className={styles.cardImg} />
                      <button
                        type="button"
                        className={styles.cardHeartBtn}
                        aria-label={favorited ? '찜 해제' : '찜하기'}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite({
                            id: card.id,
                            title: card.title,
                            subtitle: card.subtitle,
                            image: card.image,
                            category: card.tag,
                            date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
                            link: card.link ?? '',
                          });
                          showToast(favorited ? '찜 목록에서 제거했어요' : '찜 목록에 추가했어요');
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={favorited ? '#64D4F5' : 'rgba(255,255,255,0.9)'}>
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.061.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                    <div className={styles.cardBody}>
                      <span className={styles.cardTag}>{card.tag}</span>
                      <p className={styles.cardTitle}>{card.title}</p>
                      <p className={styles.cardSub}>{card.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className={styles.bottomPad} />
        <BottomNav />
      </main>
    );
  }

  // ── 단계 진행 화면 ────────────────────────────────────────
  return (
    <main className={styles.screen}>
      {step === 0 ? (
        <PageHeader />
      ) : (
        <PageHeader onBack={handleBack} backLabel="이전" />
      )}

      {/* 진행 바 (step 1~5) */}
      {step > 0 && (
        <div className={styles.progressWrap}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${(step / 5) * 100}%` }} />
          </div>
          <span className={styles.progressCount}>{step}<span className={styles.progressTotal}>/5</span></span>
        </div>
      )}

      {/* STEP 0: 도시 선택 */}
      {step === 0 && (
        <div className={styles.cityStep}>
          <span className={styles.stepBadge}>STEP 0. 도시를 선택하세요</span>
          <div className={styles.cityCards}>
            {CITIES.map((city) => {
              const favId = `city_${city}`;
              const favorited = isFavorited(favId);
              return (
                <div
                  key={city}
                  className={`${styles.cityCard} ${selections.city === city ? styles.cityCardActive : ''}`}
                  onClick={() => handleCitySelect(city)}
                  role="button"
                  tabIndex={0}
                >
                  <div className={styles.cityCardImgWrap}>
                    <img src={CITY_IMAGES[city]} alt={city} className={styles.cityCardImg} />
                  </div>
                  <div className={styles.cityCardBody}>
                    <div>
                      <div className={styles.cityCardTitleRow}>
                        <span className={styles.cityCardTitle}>
                          {city} <span className={styles.cityCardTitleEn}>({CITY_EN[city]})</span>
                        </span>
                        <button
                          type="button"
                          className={styles.cityCardHeartBtn}
                          aria-label={favorited ? '찜 해제' : '찜하기'}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite({
                              id: favId,
                              title: `${city} (${CITY_EN[city]})`,
                              subtitle: CITY_DESC[city],
                              image: CITY_IMAGES[city],
                              category: '찜한목록',
                              date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
                              link: '',
                            });
                            showToast(favorited ? '찜 목록에서 제거했어요' : '찜 목록에 추가했어요');
                          }}
                        >
                          <svg width="22" height="22" viewBox="0 0 24 24" fill={favorited ? '#64D4F5' : 'none'} stroke={favorited ? '#64D4F5' : '#9aa0a6'} strokeWidth="1.8">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </div>
                      <p className={styles.cityCardDesc}>{CITY_DESC[city]}</p>
                    </div>
                    <span className={styles.cityCardCta}>맞춤 여행 설계하기 &gt;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coming Soon 도시 */}
          <div className={styles.comingSoonList}>
            {COMING_SOON.map((c) => (
              <button
                key={c.name}
                type="button"
                className={styles.comingSoonItem}
                onClick={() => {
                  setSelectedComingSoon(c.name);
                  showToast('오픈 예정인 도시예요');
                }}
              >
                <div
                  className={`${styles.comingSoonCard} ${selectedComingSoon === c.name ? styles.comingSoonCardActive : ''}`}
                >
                  <img src={c.image} alt={c.name} className={styles.comingSoonImg} />
                  <div className={styles.comingSoonOverlay}>
                    <span className={styles.comingSoonTag}>Coming Soon</span>
                  </div>
                </div>
                <span className={styles.comingSoonName}>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1~5: 객관식 선택 */}
      {step > 0 && STEP_QUESTIONS[step] && (
        <div className={styles.questionStep}>
          <span className={styles.stepBadge}>{STEP_QUESTIONS[step]!.badge}</span>
          <div className={`${styles.optionGrid} ${step >= 2 ? styles.optionGrid4col : ''}`}>
            {STEP_QUESTIONS[step]!.options.map((opt) => {
              const isSelected = selections[STEP_KEYS[step]] === opt;
              return (
                <button
                  key={opt}
                  className={`${styles.optionBtn} ${isSelected ? styles.optionBtnActive : ''}`}
                  onClick={() => handleOptionSelect(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}