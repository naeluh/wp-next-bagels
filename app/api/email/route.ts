import { NextResponse } from 'next/server';

const cacheHeaders = {
  'Cache-Control': 's-maxage=3, stale-while-revalidate',
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const desc = searchParams.get('desc');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const name = searchParams.get('name');
  const cost = searchParams.get('cost');
  const location = searchParams.get('location');
  const time = searchParams.get('time');
  const addresOne = searchParams.get('addresOne');
  const addresTwo = searchParams.get('addresTwo');
  const city = searchParams.get('city');
  const state = searchParams.get('state');
  const zip = searchParams.get('zip');
  const deliveryDate = searchParams.get('deliveryDate');
  const fee = searchParams.get('fee');

  const url = encodeURI(
    `https://receipts.mamalagels.com/receipt?desc=${desc ?? ''}&name=${name ?? ''}&phone=${phone ?? ''}&email=${email ?? ''}&time=${time ?? ''}&location=${location ?? ''}&cost=${cost ?? ''}&addresOne=${addresOne ?? ''}&addresTwo=${addresTwo ?? ''}&city=${city ?? ''}&state=${state ?? ''}&zip=${zip ?? ''}&deliveryDate=${deliveryDate ?? ''}&fee=${fee ?? ''}`
  );

  const response = await fetch(url);

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
          message: `Fetch to the Email API failed with code: ${response.status}`,
        },
      ],
    },
    { status: 400 }
  );
}
