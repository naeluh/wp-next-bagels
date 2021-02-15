import fetch from '../../../lib/fetch';
import btoa from 'btoa'

export default async function wordPressPost(req: any, res: any ) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  if (!process.env.PASS && process.env.USER) {
    return res.status(401).json({
      errors: [{ message: 'MISSING PASS OR USER' }],
    });
  }

  const ID = req.query.id;
  const QUANTITY = req.query.quantity;

  const response = await fetch(
    `https://mamalagels.com/wp-json/acf/v3/bagel_chips/${ID}?fields[quantity]=${QUANTITY}`,
    {
      method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
            Authorization:
              'Basic ' + btoa(process.env.USER + ':' + process.env.PASS),
          },
    }
  );

  if (response.ok) {
    // Cache the Twitter response for 3 seconds, to avoid hitting the Twitter API limits
    // of 450 requests every 15 minutes (with app auth)
    res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
    res.status(200).json({
      success: [{ message: `${response.status}` }],
    });
  } else {
    res.status(400).json({
      errors: [{ message: `Fetch to the Wordpress API failed with code: ${response.status}` }],
    });
  }
}

