import { NextResponse } from 'next/server';

const BACKEND_URL =
  process.env.SEARCH_API_URL ??
  'https://eeesytripmoa-project-production.up.railway.app/search';

/** Railway LLM 검색은 30초+ 걸릴 수 있음 */
export const maxDuration = 120;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: req.signal,
    });

    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('Content-Type') ?? 'application/json',
      },
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') {
      return NextResponse.json({ error: 'Request aborted' }, { status: 499 });
    }
    const message = e instanceof Error ? e.message : 'Upstream request failed';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
