/** places_detail — 여러 장소가 한 항목에 합쳐진 경우 분리 */

const PLACE_EMOJI_HEADER =
  /^(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F)?)*)\s+(?:\*\*([^*]+)\*\*|(.+?))\s*$/u;

const EMBEDDED_PLACE_IN_LINE =
  /\s(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F)?)*)\s+(?:\*\*([^*]+)\*\*|([^\n•\-]+))/u;

function stripInlineRefs(text) {
  return String(text ?? "")
    .replace(/\s*(?:\[ref:\d+\])+\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizePlaceLabel(label) {
  return stripInlineRefs(String(label ?? "").trim().replace(/^\d+\.\s*/, ""));
}

function placeNamesMatch(a, b) {
  const na = normalizePlaceLabel(a);
  const nb = normalizePlaceLabel(b);
  if (!na || !nb) return false;
  return na === nb || na.includes(nb) || nb.includes(na);
}

export function splitDescriptionByPlaceHeaders(text) {
  const blocks = [];

  for (const line of String(text ?? "").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const header = trimmed.match(PLACE_EMOJI_HEADER);
    if (header) {
      blocks.push({
        name: normalizePlaceLabel(header[2] ?? header[3] ?? ""),
        lines: [],
      });
      continue;
    }

    const embedded = trimmed.match(EMBEDDED_PLACE_IN_LINE);
    if (embedded) {
      const before = trimmed.slice(0, embedded.index ?? 0).trim();
      const tail = blocks[blocks.length - 1];
      if (before && tail) tail.lines.push(before);
      blocks.push({
        name: normalizePlaceLabel(embedded[2] ?? embedded[3] ?? ""),
        lines: [],
      });
      continue;
    }

    const last = blocks[blocks.length - 1];
    if (last) last.lines.push(trimmed);
    else blocks.push({ name: "", lines: [trimmed] });
  }

  return blocks;
}

/** 한 places_detail에 숙소 2개 이상 → 항목 분리 */
export function expandMergedPlaceDetail(pd) {
  if (!pd || typeof pd !== "object") return [];

  const description = String(pd.description ?? "").trim();
  const blocks = splitDescriptionByPlaceHeaders(description);
  const baseName = String(pd.name ?? "").trim();

  if (blocks.length <= 1) {
    return [pd];
  }

  const namedBlocks = blocks.filter((b) => b.name);
  if (namedBlocks.length <= 1) {
    return [pd];
  }

  return blocks
    .filter((b) => b.name || b.lines.length > 0)
    .map((block) => {
      const name = block.name || baseName;
      const primary = block.name && placeNamesMatch(block.name, baseName);
      return {
        ...pd,
        name,
        description: block.lines.join("\n"),
        reviews: primary ? pd.reviews : [],
        warnings: primary ? pd.warnings : [],
      };
    });
}

export function sanitizePlaceDescription(description, placeName) {
  return String(description ?? "").trim();
}
