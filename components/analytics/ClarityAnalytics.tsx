'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackClarityPageView } from '@/lib/clarity';

/** Next.js App Router — pathname 변경마다 Clarity pageview + screen 태그 */
export default function ClarityAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackClarityPageView(pathname);
  }, [pathname]);

  return null;
}
