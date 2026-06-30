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
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 22V11" />
      <path d="M7 11l4.5-7.5a1.5 1.5 0 0 1 2.7.9V9h5.13a2 2 0 0 1 1.97 2.33l-1.2 7A2 2 0 0 1 18.13 20H10a3 3 0 0 1-3-3v-6z" />
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