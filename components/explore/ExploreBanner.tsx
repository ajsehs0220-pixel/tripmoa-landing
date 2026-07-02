'use client';

import { useState, useEffect } from 'react';
import styles from '@/app/prototype/explore/explore.module.css';
import { trackEvent } from '@/lib/gtag';

const AGODA_URL = 'https://www.agoda.com/ko-kr/search?guid=afc440be-71b1-4580-97e3-6b882f4eb126&lastSearchedCity=19041&city=9590&locale=ko-kr&currency=KRW&cid=1844104&aid=130589&checkIn=2026-07-11&checkOut=2026-07-15&rooms=1&adults=2&children=0&los=4&textToSearch=%EC%98%A4%EC%82%AC%EC%B9%B4';
const KLOOK_URL = 'https://www.klook.com/ko/search/result/?query=%EC%98%A4%EC%82%AC%EC%B9%B4&search_scope=main_search&date_range=2026-07-11&sort=most_relevant&tab_key=1&start=1&clickId=0ee83cdabe';

const SLIDES = [
  {
    type: 'lodging',
    bg: '/ad-hotel.png',
    title: ['나에게 딱 맞는 숙소', '최저가로 예약하세요'],
    sub: '엄선한 숙소만 모았어요',
    cta: '숙소 예약하기',
    ctaBg: '#FC9E04',   // ← 숙소 버튼 색
    href: AGODA_URL,
  },
  {
    type: 'activity',
    bg: '/ad-activity.png',
    title: ['오사카를 더 특별하게', '인기 투어·티켓'],
    sub: '검증된 투어만 모았어요',
    cta: '투어 예약하기',
    ctaBg: '#2F7F73',   // ← 투어 버튼 색 (원하는 값으로 변경)
    href: KLOOK_URL,
  },
];

function trackAdClick(adType: string, href: string) {
  trackEvent('click_ad_banner', {
    ad_type: adType,
    href,
    placement: 'explore',
    screen: 'explore',
  });
}

export default function ExploreBanner() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const ad = SLIDES[idx];

    return (
        <section className={styles.section}>
        <h2 className={styles.sectionTitle}>예약</h2>
            <a
        
            className={styles.exBanner}
            href={ad.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackAdClick(ad.type, ad.href)}
            style={{ backgroundImage: `url(${ad.bg})` }}
            data-ad-type={ad.type}
        >
            <div className={styles.exBannerText}>
            <strong className={styles.exBannerTitle}>
                {ad.title.map((line, i) => (
                <span key={i}>{line}</span>
                ))}
            </strong>
            <span className={styles.exBannerSub}>{ad.sub}</span>
            </div>
            <span className={styles.exBannerCta} style={{ background: ad.ctaBg }}>
            {ad.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </span>
        </a>
        </section>
    );
}