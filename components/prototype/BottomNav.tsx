'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './BottomNav.module.css';
import { trackEvent } from '@/lib/gtag';

function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z"
        fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0} />
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M9 21V13h6v8" />
    </svg>
  );
}

function IconExplore({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polygon
        points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? 1.5 : 1.5}
      />
    </svg>
  );
}

function IconArchive({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.2 : 0}
      />
    </svg>
  );
}

function IconMy({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0} />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

const TABS = [
  { label: '홈', Icon: IconHome, path: '/prototype/home' },
  { label: '탐색', Icon: IconExplore, path: '/prototype/explore' },
  { label: '아카이브', Icon: IconArchive, path: '/prototype/archive' },
  { label: 'My', Icon: IconMy, path: '/prototype/mypage' },
] as const;

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      {TABS.map(({ label, Icon, path }) => {
        const active = pathname.startsWith(path);
        return (
          <button
            key={path}
            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
            onClick={() => {
              trackEvent('click_bottom_nav', { tab_name: label, from_path: pathname });
              router.push(path);
            }}
            aria-current={active ? 'page' : undefined}
          >
            <Icon active={active} />
            <span className={styles.tabLabel}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
