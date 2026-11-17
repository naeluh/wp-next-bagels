import { NextResponse } from 'next/server';

const cacheHeaders = {
  'Cache-Control': 's-maxage=3, stale-while-revalidate',
};

export async function GET(req: Request) {
  if (!process.env.PASS && process.env.USER) {
    return NextResponse.json(
      { errors: [{ message: 'MISSING PASS OR USER' }] },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const DAY = searchParams.get('day');
  const BAGS = searchParams.get('bags');

  const response = await fetch(
    encodeURI(`https://receipts.mamalagels.com/brunch?day=${DAY}&bags=${BAGS}`)
  );

  if (response.ok) {
    return NextResponse.json(
      { success: [{ message: `${response.status}` }] },
      { headers: cacheHeaders }
    );
  }

  return NextResponse.json(
    {
      errors: [
        {
          message: `Fetch to the Brunch API failed with code: ${response.status}`,
        },
      ],
    },
    { status: 400 }
  );
}
