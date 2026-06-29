'use client';

import RefBadge from './RefBadge';

interface Props {
  content: string | null | undefined;
}

export default function RenderContent({ content }: Props) {
  if (!content) return null;

  const normalized = content.replace(/(\[ref:\d+\])\s+(?=\[ref:\d+\])/g, '$1');
  const parts = normalized.split(/(\*\*[^*]+\*\*|\[ref:\d+\])/).filter((p) => p !== '');

  return (
    <>
      {parts.map((part, i) => {
        const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
        const refMatch = part.match(/^\[ref:(\d+)\]$/);

        if (boldMatch) {
          return <strong key={i}>{boldMatch[1]}</strong>;
        }
        if (refMatch) {
          const id = Number(refMatch[1]);
          return <RefBadge key={i} id={id} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}