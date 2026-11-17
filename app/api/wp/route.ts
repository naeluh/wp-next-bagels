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
  const ID = searchParams.get('id');
  const QUANTITY = searchParams.get('quantity');

  const auth =
    'Basic ' +
    Buffer.from(
      `${process.env.USER}:${process.env.PASS}`,
      'utf8'
    ).toString('base64');

  const response = await fetch(
    `https://wp.mamalagels.com/wp-json/acf/v3/bagel_chips/${ID}?fields[quantity]=${QUANTITY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        Authorization: auth,
      },
    }
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
          message: `Fetch to the Wordpress API failed with code: ${response.status}`,
        },
      ],
    },
    { status: 400 }
  );
}
