declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** GA4 이벤트 전송 헬퍼 (gtag 없으면 무시) */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}
