import { NextResponse } from 'next/server';

const cacheHeaders = {
  'Cache-Control': 's-maxage=3, stale-while-revalidate',
};

export async function GET() {
  const response = await fetch(
    encodeURI(`https://receipts.mamalagels.com/bags`)
  );

  if (response.ok) {
    return NextResponse.json(await response.json(), { headers: cacheHeaders });
  }

  return NextResponse.json(
    {
      errors: [
        {
          message: `Fetch to the Bags API failed with code: ${response.status}`,
        },
      ],
    },
    { status: 400 }
  );
}
