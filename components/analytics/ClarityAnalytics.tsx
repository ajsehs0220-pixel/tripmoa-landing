'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackClarityPageView } from '@/lib/clarity';

export default function ClarityAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Clarity 외부 스크립트 로드 완료 후 consent + pageview
    const tryConsent = () => {
      if (typeof window.clarity === 'function') {
        window.clarity('consent');
        trackClarityPageView(pathname);
      } else {
        setTimeout(tryConsent, 500);
      }
    };
    tryConsent();
  }, [pathname]);

  return null;
}