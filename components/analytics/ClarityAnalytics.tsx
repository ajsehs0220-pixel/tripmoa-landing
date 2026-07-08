'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackClarityPageView } from '@/lib/clarity';

export default function ClarityAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const run = () => {
      if (typeof window.clarity === 'function') {
        trackClarityPageView(pathname);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(run, 1000);
    } else {
      window.addEventListener('load', () => setTimeout(run, 1000), { once: true });
    }
  }, [pathname]);

  return null;
}
