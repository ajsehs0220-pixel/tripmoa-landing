declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

const TAG_KEYS = [
  'screen',
  'city',
  'query',
  'query_length',
  'tab_name',
  'category',
  'open',
  'liked',
  'saved',
  'favorited',
  'step',
  'day',
] as const;

function clarityCall(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.clarity === 'function') {
    window.clarity(...args);
  }
}

/** Clarity 커스텀 태그 (대시보드 필터용) */
export function setClarityTag(key: string, value: string) {
  if (!value) return;
  clarityCall('set', key, value.slice(0, 120));
}

/** Clarity 커스텀 이벤트 */
export function trackClarityEvent(name: string) {
  if (!name) return;
  clarityCall('event', name);
}

/** URL 경로 → screen 태그 (SPA pageview용) */
export function screenFromPathname(pathname: string): string {
  if (!pathname || pathname === '/') return 'landing';
  const match = pathname.match(/^\/prototype\/([^/?]+)/);
  return match?.[1] ?? pathname.replace(/^\//, '').split('/')[0] ?? 'unknown';
}

/** GA4 trackEvent와 동일한 params를 Clarity 태그·이벤트로 미러 */
export function mirrorEventToClarity(name: string, params: Record<string, unknown> = {}) {
  for (const key of TAG_KEYS) {
    const val = params[key];
    if (val != null && val !== '') {
      setClarityTag(key, String(val));
    }
  }
  trackClarityEvent(name);
}

/** SPA 라우트 변경 시 pageview + screen 태그 */
export function trackClarityPageView(pathname: string) {
  const screen = screenFromPathname(pathname);
  setClarityTag('screen', screen);
  setClarityTag('path', pathname.slice(0, 120));
  trackClarityEvent('pageview');
}
