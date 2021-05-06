import fetch from '../../../lib/fetch';

export default async function bags(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const response = await fetch(
    encodeURI(`https://receipts.mamalagels.com/bags`)
  );

  if (response.ok) {
    // Cache the email response for 3 seconds
    res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
    res.status(200).json(await response.json());
  } else {
    res.status(400).json({
      errors: [
        {
          message: `Fetch to the Bags API failed with code: ${response.status}`,
        },
      ],
    });
  }
}
