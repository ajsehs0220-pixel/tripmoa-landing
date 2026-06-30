/**
 * 줄바꿈 없이 "문장1 - 문장2"로 붙은 텍스트를 표시용으로 분리.
 * 장소명(신사이바시 - 난바) 등은 문장 종결 뒤가 아니면 분리하지 않음.
 */
export function splitJoinedSentences(text: string): string[] {
  const trimmed = (text ?? '').trim();
  if (!trimmed) return [];

  if (trimmed.includes('\n')) {
    return trimmed
      .split(/\n+/)
      .flatMap((line) => splitJoinedSentences(line))
      .filter(Boolean);
  }

  const parts = trimmed.split(/(?<=[요다죠임음함\.!?])\s+-\s+(?=[가-힣])/u);
  if (parts.length > 1) {
    return parts.map((p) => p.trim()).filter(Boolean);
  }

  return [trimmed];
}
