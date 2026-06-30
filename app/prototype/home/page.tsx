'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';
import BottomNav from '@/components/prototype/BottomNav';

const CITIES = ['마쓰야마', '시즈오카', '오사카'];

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState<string | null>(null);

  function handleSearch() {
    const q = query.trim();
    if (!q) return;
    // 결과 페이지로 이동 (쿼리/도시를 URL로 전달)
    const params = new URLSearchParams({ q });
    if (city) params.set('city', city);
    router.push(`/prototype/result?${params.toString()}`);
  }

  // 도시 칩: 토글. 선택 시 city 세팅, 다시 누르면 해제
  function toggleCity(c: string) {
    setCity((prev) => (prev === c ? null : c));
  }

  return (
    <main className={styles.screen}>
      {/* 배경 장식: 비행기 + 구름 */}
      <img src="/home_sky-deco.png" alt="" className={styles.skyDeco} />

      {/* 로고 */}
      <div className={styles.logoWrap}>
        <img
          src="/moaLogo.png"
          alt="트립모아"
          className={styles.logoImg}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        <div className={styles.wordmark}>
          <span className={styles.wordmarkTrip}>Trip</span>
          <span className={styles.wordmarkMoa}>MOA</span>
        </div>
      </div>

      {/* 헤드라인 */}
      <h1 className={styles.headline}>
        내 여행에 맞는
        <br />
        <span className={styles.headlineLine2}>
          <span className={styles.headlineStrong}>실후기</span>를 검색해보세요
        </span>
      </h1>

      <div className={styles.spacer} />

      {/* 도시 칩 + 검색바: 하나로 묶어서 같이 하단 고정 (키보드 올라와도 같이 따라 올라감) */}
      <div className={styles.searchBarWrap}>
        <div className={styles.chips}>
          {CITIES.map((c) => (
            <button
              key={c}
              className={`${styles.chip} ${city === c ? styles.chipActive : ''}`}
              onClick={() => toggleCity(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className={styles.searchBar}>
          <svg className={styles.searchIcon} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
          <input
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            placeholder="예) 오사카 2박3일 맛집 여행"
            enterKeyHint="search"
          />
          <button className={styles.submitBtn} onClick={handleSearch} disabled={!query.trim()} aria-label="검색">
            {/* 스파클 아이콘 */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.5l1.9 5.4a3 3 0 001.8 1.8l5.4 1.9-5.4 1.9a3 3 0 00-1.8 1.8L12 20.7l-1.9-5.4a3 3 0 00-1.8-1.8L2.9 11.6l5.4-1.9a3 3 0 001.8-1.8L12 2.5z" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.bottomPad} />
      <BottomNav />
    </main>
  );
}