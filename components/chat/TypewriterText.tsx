'use client';

import { useEffect, useRef, useState } from 'react';
import RefBadge from './RefBadge';

interface Props {
  content: string;
  onRefClick: (id: number) => void;
  onDone?: () => void;
  speed?: number; // ms per character
  hideRefs?: boolean;
}

// content를 RenderContent와 동일한 규칙으로 토큰화한다.
// 토큰 종류: 'text' (글자 단위로 타이핑) | 'bold' | 'ref' (통째로 한번에 등장)
type Token =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'ref'; id: number };

function tokenize(content: string, hideRefs = false): Token[] {
  const normalized = content.replace(/(\[ref:\d+\])\s+(?=\[ref:\d+\])/g, '$1');
  const parts = normalized.split(/(\*\*[^*]+\*\*|\[ref:\d+\])/).filter((p) => p !== '');
  return parts.flatMap((part): Token[] => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    const refMatch = part.match(/^\[ref:(\d+)\]$/);
    if (boldMatch) return [{ type: 'bold', value: boldMatch[1] }];
    if (refMatch) return hideRefs ? [] : [{ type: 'ref', id: Number(refMatch[1]) }];
    return [{ type: 'text', value: part }];
  });
}

export default function TypewriterText({ content, onRefClick, onDone, speed = 22, hideRefs = false }: Props) {
  const tokens = useRef<Token[]>(tokenize(content, hideRefs));
  const [tokenIndex, setTokenIndex] = useState(0); // 완전히 다 보여준 토큰 개수
  const [charIndex, setCharIndex] = useState(0); // 현재 'text' 토큰에서 보여준 글자 수
  const doneRef = useRef(false);

  useEffect(() => {
    tokens.current = tokenize(content, hideRefs);
    setTokenIndex(0);
    setCharIndex(0);
    doneRef.current = false;
  }, [content, hideRefs]);

  useEffect(() => {
    const list = tokens.current;
    if (tokenIndex >= list.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }

    const current = list[tokenIndex];

    // bold/ref 토큰은 한번에 등장 (다음 틱에 토큰 인덱스만 올림)
    if (current.type !== 'text') {
      const t = setTimeout(() => setTokenIndex((i) => i + 1), speed);
      return () => clearTimeout(t);
    }

    // text 토큰은 글자 단위로 진행
    if (charIndex < current.value.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTokenIndex((i) => i + 1);
        setCharIndex(0);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [tokenIndex, charIndex, speed, onDone]);

  const list = tokens.current;

  return (
    <>
      {list.slice(0, tokenIndex).map((tok, i) => {
        if (tok.type === 'bold') return <strong key={i}>{tok.value}</strong>;
        if (tok.type === 'ref') return <RefBadge key={i} id={tok.id} />;
        return <span key={i}>{tok.value}</span>;
      })}
      {tokenIndex < list.length && list[tokenIndex].type === 'text' && (
        <span>{(list[tokenIndex] as { type: 'text'; value: string }).value.slice(0, charIndex)}</span>
      )}
    </>
  );
}
