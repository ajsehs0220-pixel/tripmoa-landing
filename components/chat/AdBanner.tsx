'use client';

import styles from './chat.module.css';
import type { Section } from './types';

// 숙박 판별: 섹션에 🏨 아이콘이 있거나(정보형) 쿼리에 숙박 키워드가 있으면(추천형) 숙박 배너
const LODGING_RE = /숙소|숙박|호텔|료칸|게하|게스트하우스|호스텔|민박|에어비앤비|펜션|잘\s?곳|묵을|묵기/;

// ⚠️ 오사카 기준 어필리에이트 링크. 시즈오카/마쓰야마용은 추후 city별로 분기 필요.
const AGODA_URL = 'https://www.agoda.com/ko-kr/search?guid=afc440be-71b1-4580-97e3-6b882f4eb126&lastSearchedCity=19041&asq=NQVGXW6jsE3tbdY9S%2BqUCpufa9Vwpz6XltTHq4n%2B9gPt6Sc9VYM%2BOtJvOdzFsuZ%2F5%2ByHRueUB1uDqevgQfUffRpp2mR9QI4VB4DSLLZPVtnzxEyOzlhNd1%2B58eTaTKCX7Dx8YH6oWuDOObQ0RgWXI20t3c82nJ%2Fp%2B0GXkwK5hQ%2FC%2F83hEr7aBZdqUNR0S5a4sAN4KRZHFu%2BmP3BgznjDkg%3D%3D&city=9590&tick=639185922472&locale=ko-kr&ckuid=efb7b0f3-0e72-43b6-ae06-1391698657c0&prid=0&currency=KRW&correlationId=686d627c-6951-45e2-98eb-2fdb2fd44d93&analyticsSessionId=6854888165892234871&pageTypeId=1&realLanguageId=9&languageId=9&origin=KR&stateCode=11&cid=1844104&userId=efb7b0f3-0e72-43b6-ae06-1391698657c0&whitelabelid=1&loginLvl=0&storefrontId=3&currencyId=26&currencyCode=KRW&htmlLanguage=ko-kr&cultureInfoName=ko-kr&machineName=sg-pc-6f-acm-web-user-9984584d6-f7cnn&trafficGroupId=1&trafficSubGroupId=84&aid=130589&useFullPageLogin=true&cttp=4&isRealUser=true&mode=production&browserFamily=Chrome&cdnDomain=agoda.net&checkIn=2026-07-11&checkOut=2026-07-15&rooms=1&adults=2&children=0&priceCur=KRW&los=4&textToSearch=%EC%98%A4%EC%82%AC%EC%B9%B4&productType=-1&travellerType=1&familyMode=off&ds=V4lA70TZsSjNgt48';

const KLOOK_URL = 'https://www.klook.com/ko/search/result/?query=%EC%98%A4%EC%82%AC%EC%B9%B4&search_scope=main_search&date_range=2026-07-11&sort=most_relevant&tab_key=1&start=1&spm=SearchResult.Confirm&clickId=0ee83cdabe';

function trackAdClick(adType: string, href: string) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag('event', 'click_ad_banner', {
      ad_type: adType,
      href,
    });
  }
}

export default function AdBanner({
  query,
  sections,
  city,
}: {
  query: string;
  sections: Section[];
  city?: string;
}) {
  const isLodging =
    sections.some((s) => s.icon?.includes('🏨')) || LODGING_RE.test(query);

  const ad = isLodging
    ? {
        type: 'lodging',
        bg: '/ad-hotel.png',
        title: ['나에게 딱 맞는 숙소', '최저가로 예약하세요'],
        sub: '엄선한 숙소만 모았어요',
        cta: '숙소 예약하기',
        href: AGODA_URL,
      }
    : {
        type: 'activity',
        bg: '/ad-activity.png',
        title: [`${city ? `${city}를` : '여행을'} 더 특별하게`, '인기 투어·티켓'],
        sub: '검증된 투어만 모았어요',
        cta: '투어 예약하기',
        href: KLOOK_URL,
      };

  return (
    <a
      className={styles.adBanner}
      href={ad.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={() => trackAdClick(ad.type, ad.href)}
      style={{ backgroundImage: `url(${ad.bg})` }}
      data-ad-type={ad.type}
    >
      <div className={styles.adBannerText}>
        <strong className={styles.adBannerTitle}>
          {ad.title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </strong>
        <span className={styles.adBannerSub}>{ad.sub}</span>
      </div>
      <span className={styles.adBannerCta}>
        {ad.cta}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}