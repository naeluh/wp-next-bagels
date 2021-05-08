import fetch from '../../../lib/fetch';

export default async function brunch(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  if (!process.env.PASS && process.env.USER) {
    return res.status(401).json({
      errors: [{ message: 'MISSING PASS OR USER' }],
    });
  }

  const DAY = req.query.day;
  const BAGS = req.query.bags;

  const response = await fetch(
    encodeURI(`https://receipts.mamalagels.com/brunch?day=${DAY}&bags=${BAGS}`)
  );

  if (response.ok) {
    // Cache the Brunch response for 3 seconds
    res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
    res.status(200).json({
      success: [{ message: `${response.status}` }],
    });
  } else {
    res.status(400).json({
      errors: [
        {
          message: `Fetch to the Brunch API failed with code: ${response.status}`,
        },
      ],
    });
  }
}
