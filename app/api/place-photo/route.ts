import { NextResponse } from 'next/server';

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

export async function GET(req: Request) {
  const name = new URL(req.url).searchParams.get('name');
  if (!name || !KEY) return NextResponse.json({ url: null });

  try {
    const searchRes = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': KEY,
          'X-Goog-FieldMask': 'places.photos',
        },
        body: JSON.stringify({ textQuery: name, maxResultCount: 1 }),
        next: { revalidate: 86400 },
      }
    );

    const searchData = await searchRes.json();
    const photoName = searchData?.places?.[0]?.photos?.[0]?.name;
    if (!photoName) return NextResponse.json({ url: null });

    const mediaRes = await fetch(
      `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=600&skipHttpRedirect=true&key=${KEY}`
    );
    const mediaData = await mediaRes.json();

    return NextResponse.json({ url: mediaData?.photoUri ?? null });
  } catch {
    return NextResponse.json({ url: null });
  }
}
