'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './explore.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import PageHeader from '@/components/prototype/PageHeader';
import { getExploreMock, ExploreCard, ExploreResult } from '@/lib/exploreMock';
import { useToast } from '@/components/prototype/Toast';
import { useFavorites } from '@/components/prototype/FavoritesContext';
import { useRecentViews } from '@/components/prototype/RecentViewContext';
import ExploreBanner from '@/components/explore/ExploreBanner';

// ── 단계 데이터 ──────────────────────────────────────────────

type StepKey = 'city' | 'duration' | 'groupSize' | 'companion' | 'concept' | 'budget';

// STEP1~5 순서: 여행기간 → 몇명이서 → 누구와 → 컨셉 → 예산
const STEP_KEYS: StepKey[] = ['city', 'duration', 'groupSize', 'companion', 'concept', 'budget'];

const STEP_QUESTIONS: Record<Exclude<StepKey, 'city'>, { badge: string; title: string; options: string[] }> = {
  duration: {
    badge: 'STEP 1. 여행기간',
    title: '여행 기간은 어느 정도인가요?',
    options: ['당일치기', '1박2일', '2박3일', '3박4일', '4박5일', '5일 이상'],
  },
  groupSize: {
    badge: 'STEP 2. 몇명이서?',
    title: '몇 명이서 가시나요?',
    options: ['1인', '2인', '3인', '4인', '5인 이상'],
  },
  companion: {
    badge: 'STEP 3. 누구와?',
    title: '누구와 함께 가시나요?',
    options: ['혼자', '친구와', '연인과', '부모님과', '아이와'],
  },
  concept: {
    badge: 'STEP 4. 여행 컨셉',
    title: '어떤 여행 컨셉인가요?',
    options: ['식도락', '힐링', '핫플', '액티비티', '로맨틱', '효도여행'],
  },
  budget: {
    badge: 'STEP 5. 예산',
    title: '예산은 어느 정도인가요?',
    options: ['가성비', '밸런스', '럭셔리'],
  },
};

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
  const [phase, setPhase] = useState<'start' | 'city' | 'form' | 'loading' | 'result'>('start');
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComingSoon, setSelectedComingSoon] = useState<string | null>(null);

  const sectionRefs = useRef<Partial<Record<StepKey, HTMLDivElement | null>>>({});

  useEffect(() => {
    if (phase !== 'loading') return;
    const id = setTimeout(() => setPhase('result'), 4500);
    return () => clearTimeout(id);
  }, [phase]);

  const FORM_KEYS = STEP_KEYS.slice(1); // city 제외, STEP1~5만
  const answeredCount = FORM_KEYS.filter((k) => selections[k]).length;
  const allAnswered = answeredCount === FORM_KEYS.length;

  function handleCitySelect(city: string) {
    setSelections((prev) => ({ ...prev, city }));
    setPhase('form');
  }

  function handleSelect(key: StepKey, value: string) {
    setSelections((prev) => ({ ...prev, [key]: value }));

    // 다음 미답변 섹션으로 자연스럽게 스크롤 이동
    const idx = FORM_KEYS.indexOf(key);
    const nextKey = FORM_KEYS.slice(idx + 1).find((k) => !selections[k]);
    if (nextKey && nextKey !== key) {
      requestAnimationFrame(() => {
        sectionRefs.current[nextKey]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  function handleStart() {
    if (!allAnswered) return;
    setPhase('loading');
  }

  function handleFormBack() {
    setPhase('city');
  }

  function handleReset() {
    setPhase('start');
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

// ── 인트로 화면 (탭 진입 시작 화면) ──────────────────────────
  if (phase === 'start') {
    return (
      <main className={styles.startScreen}>
        <div className={styles.startBody}>
          <img src="/exploreStartPage.png" alt="" className={styles.startBgImg} />
          <div className={styles.startTextWrap}>
            <p className={styles.wordMark}>Trip <span style={{ color: '#64D4F5' }}>MOA</span></p>
            <p className={styles.startTitle}>MOA와 함께<br />완벽한 여행을 탐색해보세요!</p>
            <p className={styles.startSub}>당신만의 맞춤형 리얼 정보를 찾아드릴게요</p>
          </div>
        </div>

        <div className={styles.startCtaWrap}>
          <button
            type="button"
            className={styles.startBtn}
            onClick={() => setPhase('city')}
          >
            탐색 시작하기
          </button>
        </div>

        <BottomNav />
      </main>
    );
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
          <React.Fragment key={key}>
            <section className={styles.section}>
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
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorited ? '#f43f5e' : 'rgba(255,255,255,0.9)'}>
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

            {key === 'lodging' && <ExploreBanner />}
          </React.Fragment>
        ))}

        <div className={styles.bottomPad} />
        <BottomNav />
      </main>
    );
  }

  // ── STEP 0: 도시 선택 화면 ──────────────────────────────────
  if (phase === 'city') {
    return (
      <main className={styles.screen}>
        <PageHeader onBack={() => setPhase('start')} backLabel="처음으로" />

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
                          <svg width="22" height="22" viewBox="0 0 24 24" fill={favorited ? '#f43f5e' : 'none'} stroke={favorited ? '#f43f5e' : '#9aa0a6'} strokeWidth="1.8">
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

        <div className={styles.bottomPad} />
        <BottomNav />
      </main>
    );
  }

  // ── STEP 1~5: 한 화면 스크롤 폼 ──────────────────────────────
  return (
    <main className={styles.screen}>
      <PageHeader onBack={handleFormBack} backLabel="도시 다시 선택" />

      {/* 진행 바 (스티키, 답변 개수 기준) */}
      <div className={`${styles.progressWrap} ${styles.progressWrapSticky}`}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(answeredCount / FORM_KEYS.length) * 100}%` }} />
        </div>
        <span className={styles.progressCount}>
          {answeredCount}<span className={styles.progressTotal}>/{FORM_KEYS.length}</span>
        </span>
      </div>

      {/* 지금까지 선택한 답변 칩 (누르면 해당 섹션으로 이동) */}
      {answeredCount > 0 && (
        <div className={`${styles.tagsWrap} ${styles.formTagsWrap}`}>
          <span className={styles.answerChip}>#{selections.city}</span>
          {FORM_KEYS.filter((k) => selections[k]).map((k) => (
            <button
              key={k}
              type="button"
              className={styles.answerChip}
              onClick={() => sectionRefs.current[k]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            >
              #{selections[k]}
            </button>
          ))}
        </div>
      )}

      {/* STEP 1~5: 객관식 — 전부 나열, 언제든 다시 클릭해서 수정 가능 */}
      {FORM_KEYS.map((key) => {
        const q = STEP_QUESTIONS[key as Exclude<StepKey, 'city'>];
        return (
          <div
            key={key}
            ref={(el) => { sectionRefs.current[key] = el; }}
            className={styles.questionStep}
          >
            <span className={styles.stepBadge}>{q.badge}</span>
            <div className={`${styles.optionGrid} ${styles.optionGrid4col}`}>
              {q.options.map((opt) => {
                const isSelected = selections[key] === opt;
                return (
                  <button
                    key={opt}
                    className={`${styles.optionBtn} ${isSelected ? styles.optionBtnActive : ''}`}
                    onClick={() => handleSelect(key, opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 전체 답변 완료 시 노출되는 시작 버튼 */}
      <div className={styles.startBtnWrap}>
        <button
          type="button"
          className={styles.startBtn}
          onClick={handleStart}
          disabled={!allAnswered}
        >
          {allAnswered ? '여행 설계 시작하기' : `${FORM_KEYS.length - answeredCount}개 항목을 더 선택해주세요`}
        </button>
      </div>

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}