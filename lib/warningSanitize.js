/**
 * warning을 15자 이내 키워드형으로 정규화
 */

const CAUTION_RULES = [
  { re: /타이밍\s*티켓|사전\s*예약|예약\s*필수|예약\s*해야|예약\s*없/, label: "사전예약 필수" },
  { re: /막차|마지막\s*열차|라스트\s*오더/i, label: "막차·마감 확인" },
  { re: /휴무|정기\s*휴|쉬는\s*날/, label: "휴무일 확인" },
  { re: /월요일|화요일|수요일|목요일|금요일|토요일|일요일/, label: "요일별 휴무 확인" },
  { re: /현금\s*만|현금\s*only/i, label: "현금만 가능" },
  { re: /입장\s*(제한|불가)|못\s*들어|입장\s*불/, label: "입장 제한 있음" },
  { re: /티켓|입장권|패스/, label: "티켓 사전확인" },
  { re: /줄\s|대기|웨이팅|기다/, label: "대기 시간 길어요" },
  { re: /좁|빡빡|캐리어/, label: "공간·수납 주의" },
  { re: /일찍|아침\s*일찍|오픈\s*런/, label: "오픈런·이른 방문" },
  { re: /불친절|불쾌|무뚝뚝|직원.*별로/, label: "직원 서비스 아쉬움" },
  { re: /끈적|눅눅|위생|더럽|지저분/, label: "위생 주의" },
  { re: /맵|짜|달|느끼|비려/, label: "맛 호불호 있음" },
  { re: /비싸|가성비.*별로|가격.*아깝/, label: "가격 대비 아쉬움" },
  { re: /시끄|복잡|사람.*많|붐비/, label: "혼잡할 수 있음" },
  { re: /교통|이동|주차|운전|운행|셔틀|shuttle/i, label: "교통·이동 주의" },
  { re: /계단|경사|힘들|체력|몸\s*아/, label: "신체 부담 주의" },
];

const SCHEDULE_FEELING_PATTERN =
  /시간.*(없|부족|짧|너무)|체류.*짧|너무\s*없|일정.*부족|촉박|포기하면|넣고\s*싶/i;

function stripWarningEndings(body) {
  return body
    .replace(
      /(?:입니다|습니다|해요|돼요|있어요|없어요|주세요|에요|예요|네요|같아요)[.!]?$/u,
      ""
    )
    .replace(/[.!?…]+$/u, "")
    .trim()
    .replace(/(?:없는\s*건?|너무\s*없)$/u, "")
    .trim();
}

export function warningClauseFromReview(text, maxLen = 15) {
  let clause = String(text)
    .replace(/\*\*/g, "")
    .replace(/\[ref:\d+\]/g, "")
    .split(/[\n]/)[0]
    .split(/[.。!?]/)[0]
    .trim();
  if (clause.length < 4) return "";
  if (/[?？]|궁금|할까|어떻게|알려|가능할까|과한|죠\?|까요|을까|를까/i.test(clause)) return "";
  if (SCHEDULE_FEELING_PATTERN.test(clause)) return "";
  clause = stripWarningEndings(clause);
  if (clause.length < 4) return "";
  return clause.length > maxLen ? clause.slice(0, maxLen) : clause;
}

function refSuffix(text) {
  const m = String(text).match(/(\s*(?:\[ref:\d+\])+)\s*$/);
  return m ? m[1] : "";
}

export function sanitizeWarningText(text) {
  const suffix = refSuffix(text);
  let body = String(text ?? "")
    .replace(/\s*(?:\[ref:\d+\])+/g, "")
    .replace(/\*\*/g, "")
    .replace(/^⚠️\s*/, "")
    .trim();

  if (!body) return suffix.trim();

  for (const { re, label } of CAUTION_RULES) {
    if (re.test(body)) return `${label}${suffix}`;
  }

  body = stripWarningEndings(body);

  if (/[?？]|궁금|할까/i.test(body) || SCHEDULE_FEELING_PATTERN.test(body)) {
    return suffix ? `주의사항 확인${suffix}` : "";
  }

  if (body.length > 16) {
    body = body.slice(0, 15).trimEnd();
  }

  return suffix ? `${body}${suffix}` : body;
}

export function sanitizeWarnings(warnings) {
  if (!Array.isArray(warnings)) return [];
  return warnings
    .map((w) => sanitizeWarningText(w))
    .filter(Boolean);
}
