'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './explore.module.css';
import BottomNav from '@/components/prototype/BottomNav';
import { getExploreMock, ExploreCard, ExploreResult } from '@/lib/exploreMock';

// ── 단계 데이터 ──────────────────────────────────────────────

type StepKey = 'city' | 'duration' | 'companion' | 'groupSize' | 'concept' | 'budget';

const STEP_KEYS: StepKey[] = ['city', 'duration', 'companion', 'groupSize', 'concept', 'budget'];

const STEP_QUESTIONS: Array<null | { title: string; options: string[] }> = [
  null, // step 0: 도시 선택
  { title: '여행 기간은 어느 정도인가요?', options: ['3일 이하', '5일 이하', '일주일 이상', '3주 이상'] },
  { title: '누구와 함께 가시나요?', options: ['나 혼자', '친구와', '아이와', '10대와', '연인과', '동료와', '부모님과', '조부모님과'] },
  { title: '몇 명이서 가시나요?', options: ['1명~4명', '5명 이상', '10인 이하', '10인 이상', '단체'] },
  { title: '어떤 여행 컨셉인가요?', options: ['식도락', '힐링', '핫플', '액티비티'] },
  { title: '예산은 어느 정도인가요?', options: ['가성비', '밸런스', '럭셔리'] },
];

const CITIES = ['오사카', '시즈오카', '마쓰야마'];

const CITY_COLORS: Record<string, string> = {
  오사카: 'linear-gradient(145deg, #ff6b35 0%, #f7931e 100%)',
  시즈오카: 'linear-gradient(145deg, #28c5f0 0%, #005f80 100%)',
  마쓰야마: 'linear-gradient(145deg, #6f86f5 0%, #8b7cf6 100%)',
};

const CITY_EMOJIS: Record<string, string> = {
  오사카: '🏯',
  시즈오카: '🗻',
  마쓰야마: '♨️',
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
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<'steps' | 'loading' | 'result'>('steps');
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);

  // 로딩 → 결과 자동 전환 (2.5초)
  useEffect(() => {
    if (phase !== 'loading') return;
    const id = setTimeout(() => setPhase('result'), 2500);
    return () => clearTimeout(id);
  }, [phase]);

  function handleCityCTA() {
    if (!selections.city) return;
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
  }

  // ── 로딩 화면 ────────────────────────────────────────────
  if (phase === 'loading') {
    const city = selections.city;
    const bg = CITY_COLORS[city] ?? CITY_COLORS['오사카'];
    const repeatedLabel = `${city} · ${city} · ${city} · `;

    return (
      <div className={styles.loadingScreen} style={{ background: bg }}>
        <div className={styles.loadingRing}>
          {/* 원형 텍스트 SVG */}
          <svg className={styles.circleTextSvg} viewBox="0 0 200 200">
            <defs>
              <path id="cp" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
            </defs>
            <text className={styles.circleTextEl}>
              <textPath href="#cp" startOffset="0%">{repeatedLabel}</textPath>
            </text>
          </svg>
          {/* 도시 이모지 + 이름 */}
          <div className={styles.loadingCityInner}>
            <span className={styles.loadingEmoji}>{CITY_EMOJIS[city]}</span>
            <span className={styles.loadingCityName}>{city}</span>
          </div>
        </div>
        <p className={styles.loadingText}>당신을 위한 여행을 설계하고 있어요</p>
        <div className={styles.loadingDots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    );
  }

  // ── 결과 화면 ────────────────────────────────────────────
  if (phase === 'result') {
    const result = getExploreMock(selections.city);
    const tags = STEP_KEYS.map((k) => selections[k]).filter(Boolean);

    return (
      <main className={styles.screen}>
        <div className={styles.header}>
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

        {/* 선택 태그 */}
        <div className={styles.tagsWrap}>
          {tags.map((t) => (
            <span key={t} className={styles.tag}>#{t}</span>
          ))}
        </div>
        <p className={styles.resultSubtitle}>{selections.city} 맞춤 여행 큐레이션이에요</p>

        {/* 카테고리별 카드 */}
        {CATEGORIES.map(({ key, label }) => (
          <section key={key} className={styles.section}>
            <h2 className={styles.sectionTitle}>{label}</h2>
            <div className={styles.cardRow}>
              {(result[key] as ExploreCard[]).map((card) => (
                <div key={card.id} className={styles.card}>
                  <img src={card.image} alt={card.title} className={styles.cardImg} />
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
      {/* 진행 바 + 뒤로가기 (step 1~5) */}
      {step > 0 && (
        <div className={styles.progressWrap}>
          <button className={styles.backBtn} onClick={handleBack} aria-label="이전">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${(step / 5) * 100}%` }} />
          </div>
          <span className={styles.progressCount}>{step}<span className={styles.progressTotal}>/5</span></span>
        </div>
      )}

      {/* STEP 0: 도시 선택 */}
      {step === 0 && (
        <div className={styles.cityStep}>
          <div className={styles.logoRow}>
            <span className={styles.wTrip}>Trip</span><span className={styles.wMoa}>MOA</span>
          </div>
          <h1 className={styles.stepTitle}>어느 도시로<br />떠나고 싶으세요?</h1>
          <div className={styles.cityCards}>
            {CITIES.map((city) => (
              <button
                key={city}
                className={`${styles.cityCard} ${selections.city === city ? styles.cityCardActive : ''}`}
                style={{ background: CITY_COLORS[city] }}
                onClick={() => setSelections((prev) => ({ ...prev, city }))}
              >
                <span className={styles.cityEmoji}>{CITY_EMOJIS[city]}</span>
                <span className={styles.cityName}>{city}</span>
              </button>
            ))}
          </div>
          <button
            className={styles.ctaBtn}
            disabled={!selections.city}
            onClick={handleCityCTA}
          >
            맞춤 여행 설계하기
          </button>
        </div>
      )}

      {/* STEP 1~5: 객관식 선택 */}
      {step > 0 && STEP_QUESTIONS[step] && (
        <div className={styles.questionStep}>
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
