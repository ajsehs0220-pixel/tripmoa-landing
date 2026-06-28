export function formatSourceChannel(channel: string): string {
  if (channel?.includes('카페')) return '네이버 카페';
  if (channel?.includes('블로그')) return '네이버 블로그';
  return channel || '웹';
}

export function truncateSourceTitle(title: string, maxLen = 52): string {
  const trimmed = title.trim();
  if (trimmed.length <= maxLen) return trimmed;
  return `${trimmed.slice(0, maxLen).trimEnd()}...`;
}
