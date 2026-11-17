import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const apiUrl = process.env.WORDPRESS_API_URL;
  if (!apiUrl) {
    return NextResponse.json(
      { errors: [{ message: 'WORDPRESS_API_URL is not configured' }] },
      { status: 500 }
    );
  }

  const body = await req.json();

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  return NextResponse.json(json);
}
