/** warning 문장을 짧은 키워드형으로 표시 (어미·종결 제거). [ref:N]은 유지 */
export function formatWarningShort(text: string): string {
  const refSuffix = (text.match(/(\s*(?:\[ref:\d+\])+)\s*$/) ?? [])[1] ?? '';
  let t = text.replace(/\s*(?:\[ref:\d+\])+/g, '').replace(/\*\*/g, '').trim();
  if (!t) return refSuffix.trim();

  t = t.replace(/^⚠️\s*/, '');

  for (const { re, label } of [
    { re: /타이밍\s*티켓|사전\s*예약|예약\s*필수/i, label: '사전예약 필수' },
    { re: /막차|마감/i, label: '막차·마감 확인' },
    { re: /대기|웨이팅|줄\s/i, label: '대기 시간 길어요' },
    { re: /불친절|불쾌|무뚝뚝|직원.*별로/i, label: '직원 서비스 아쉬움' },
    { re: /끈적|눅눅|위생|더럽|지저분/i, label: '위생 주의' },
    { re: /비싸|가성비.*별로|가격.*아깝/i, label: '가격 대비 아쉬움' },
    { re: /시끄|복잡|사람.*많|붐비/i, label: '혼잡할 수 있음' },
  ]) {
    if (re.test(t)) {
      t = label;
      break;
    }
  }

  // 종결 어미·문장 부호 제거
  t = t.replace(
    /(?:입니다|습니다|해요|돼요|있어요|없어요|주세요|해 주세요|하세요|에요|예요|이에요|네요|거예요|같아요|좋아요)[.!]?$/u,
    ''
  );
  t = t.replace(/[.!?…]+$/u, '').trim();
  t = t.replace(/(?:없는\s*건?|너무\s*없)$/u, '').trim();

  if (t.length > 18 || /[?？]|궁금|할까/.test(t)) {
    return refSuffix.trim() || '주의사항 확인';
  }

  return refSuffix ? `${t}${refSuffix}` : t;
}