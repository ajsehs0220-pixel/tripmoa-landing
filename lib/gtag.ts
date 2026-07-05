import { mirrorEventToClarity } from './clarity';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** GA4 + Clarity 이벤트 전송 (각 SDK 없으면 해당 쪽만 무시) */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
  mirrorEventToClarity(name, params);
}
