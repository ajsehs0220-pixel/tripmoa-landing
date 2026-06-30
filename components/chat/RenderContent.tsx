'use client';

import RefBadge from './RefBadge';

interface Props {
  content: string | null | undefined;
  onRefClick: (id: number) => void;
  /** **bold**를 강조 없이 일반 텍스트로 렌더 */
  plainBold?: boolean;
  /** 설명·warning 등 — 같은 ref는 첫 표기만 배지 노출 */
  dedupeRefs?: Set<number>;
  /** 써머리 등 — [ref:N] 미표시 */
  hideRefs?: boolean;
}

export default function RenderContent({
  content,
  onRefClick,
  plainBold = false,
  dedupeRefs,
  hideRefs = false,
}: Props) {
  if (!content) return null;

  const normalized = content.replace(/(\[ref:\d+\])\s+(?=\[ref:\d+\])/g, '$1');
  const parts = normalized.split(/(\*\*[^*]+\*\*|\[ref:\d+\])/).filter((p) => p !== '');

  return (
    <>
      {parts.map((part, i) => {
        const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
        const refMatch = part.match(/^\[ref:(\d+)\]$/);

        if (boldMatch) {
          if (plainBold) {
            return <span key={i}>{boldMatch[1]}</span>;
          }
          return <strong key={i}>{boldMatch[1]}</strong>;
        }
        if (refMatch) {
          if (hideRefs) return null;
          const id = Number(refMatch[1]);
          if (dedupeRefs?.has(id)) return null;
          dedupeRefs?.add(id);
          return <RefBadge key={i} id={id} onClick={() => onRefClick(id)} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
