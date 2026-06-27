'use client';
 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './explore.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { getExploreMock, ExploreCard, ExploreResult } from '@/lib/exploreMock';
 
// ── 단계 데이터 ──────────────────────────────────────────────
 
type StepKey = 'city' | 'duration' | 'companion' | 'groupSize' | 'concept' | 'budget';
 
const STEP_KEYS: StepKey[] = ['city', 'duration', 'companion', 'groupSize', 'concept', 'budget'];
 
const STEP_QUESTIONS: Array<null | { badge: string; title: string; options: string[] }> = [
  null, // step 0: 도시 선택
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
  { name: '파리', image: '/ExploreMain2-Paris.png' },
  { name: '다낭', image: '/ExploreMain2-Danang.png' },
  { name: '방콕', image: '/ExploreMain2-Bangkok.png' },
];
 
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
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<'steps' | 'loading' | 'result'>('steps');
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
  const [searchQuery, setSearchQuery] = useState('');
 
  // 로딩 → 결과 자동 전환 (2.5초)
  useEffect(() => {
    if (phase !== 'loading') return;
    const id = setTimeout(() => setPhase('result'), 2500);
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
 
  // ── 로딩 화면 ────────────────────────────────────────────
  if (phase === 'loading') {
    const city = selections.city;
    const bgImage = CITY_IMAGES[city] ?? CITY_IMAGES['오사카'];
 
    return (
      <div className={styles.loadingScreen}>
        <img src={bgImage} alt={city} className={styles.loadingBgImg} />
        <div className={styles.loadingDim} />
        <div className={styles.loadingRing}>
          <span className={styles.loadingCityName}>{CITY_EN[city] ?? city}</span>
        </div>
        <div className={styles.loadingTextWrap}>
          <p className={styles.loadingText}>당신을 위한 여행을 설계하고 있어요</p>
          <div className={styles.loadingDots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>
      </div>
    );
  }
 
  // ── 결과 화면 ────────────────────────────────────────────
  if (phase === 'result') {
    // STEP 4(여행 컨셉) 선택값을 반영해 카드 우선순위가 조정된 풀을 가져옴.
    // 컨셉이 없거나 매칭 안 되면 getExploreMock 내부에서 기본 풀로 자동 폴백.
    const result = getExploreMock(selections.city, selections.concept);
    const tags = STEP_KEYS.map((k) => selections[k]).filter(Boolean);
 
    return (
      <main className={styles.screen}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.backBtn} onClick={handleReset} aria-label="처음으로">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className={styles.headerWordmark}>
              <span className={styles.wTrip}>Trip</span><span className={styles.wMoa}>MOA</span>
            </span>
          </div>
        </div>
 
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
            placeholder="예) 오사카 2박3일 맛집 여행"
          />
          <button className={styles.submitBtn} aria-label="검색">
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
              {(result[key] as ExploreCard[]).map((card) => (
                <div key={card.id} className={styles.card}>
                  <img src={card.image ?? undefined} alt={card.title} className={styles.cardImg} />
                  <div className={styles.cardBody}>
                    <span className={styles.cardTag}>{card.tag}</span>
                    <p className={styles.cardTitle}>{card.title}</p>
                    <p className={styles.cardSub}>{card.subtitle}</p>
                  </div>
                </div>
              ))}
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
      {/* 헤더 (도시선택 단계) */}
      {step === 0 && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.headerWordmark}>
              <span className={styles.wTrip}>Trip</span><span className={styles.wMoa}> MOA</span>
            </span>
          </div>
        </div>
      )}
 
      {/* 진행 바 + 뒤로가기 (step 1~5) */}
      {step > 0 && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <button className={styles.backBtn} onClick={handleBack} aria-label="이전">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span className={styles.headerWordmark}>
              <span className={styles.wTrip}>Trip</span><span className={styles.wMoa}>MOA</span>
            </span>
          </div>
        </div>
      )}
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
            {CITIES.map((city) => (
              <button
                key={city}
                className={`${styles.cityCard} ${selections.city === city ? styles.cityCardActive : ''}`}
                onClick={() => handleCitySelect(city)}
              >
                <div className={styles.cityCardImgWrap}>
                  <img src={CITY_IMAGES[city]} alt={city} className={styles.cityCardImg} />
                </div>
                <div className={styles.cityCardBody}>
                  <div>
                    <span className={styles.cityCardTitle}>
                      {city} <span className={styles.cityCardTitleEn}>({CITY_EN[city]})</span>
                    </span>
                    <p className={styles.cityCardDesc}>{CITY_DESC[city]}</p>
                  </div>
                  <span className={styles.cityCardCta}>맞춤 여행 설계하기 &gt;</span>
                </div>
              </button>
            ))}
          </div>
 
          {/* Coming Soon 도시 */}
          <span className={styles.comingSoonHeading}>곧 만나볼 수 있어요</span>
          <div className={styles.comingSoonList}>
            {COMING_SOON.map((c) => (
              <div key={c.name} className={styles.comingSoonCard}>
                <img src={c.image} alt={c.name} className={styles.comingSoonImg} />
                <div className={styles.comingSoonOverlay}>
                  <span className={styles.comingSoonTag}>Coming Soon</span>
                </div>
                <span className={styles.comingSoonName}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
 
      {/* STEP 1~5: 객관식 선택 */}
      {step > 0 && STEP_QUESTIONS[step] && (
        <div className={styles.questionStep}>
          <span className={styles.stepBadge}>{STEP_QUESTIONS[step]!.badge}</span>
          <h2 className={styles.questionTitle}>{STEP_QUESTIONS[step]!.title}</h2>
          <div className={styles.optionGrid}>
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