'use client';

import type { ReactNode } from 'react';

export function IconCopy() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M6 16H5a2 2 0 01-2-2V5a2 2 0 012-2h9a2 2 0 012 2v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconThumbUp({ filled }: { filled?: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 11v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 10.5l2.54-5.37a2.41 2.41 0 0 1 2.4-2.09h1.67a2.41 2.41 0 0 1 2.4 2.09l.03.14-.03 1.08 1.09-2.14a1.6 1.6 0 0 1 1.44-.85h1.84a1.6 1.6 0 0 1 1.6 1.6v1.1a2 2 0 0 1-.16.76l-1.05 2.56a1.6 1.6 0 0 1-1.48 1.06H5.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  );
}

export function IconShare() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v10M12 3l4 4M12 3L8 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type ToolbarAction = {
  id: string;
  icon: ReactNode;
  label: string;
  onClick: () => void | Promise<void>;
  active?: boolean;
  feedbackLabel?: string;
};
