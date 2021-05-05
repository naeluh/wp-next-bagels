import fetch from '../../../lib/fetch';
import btoa from 'btoa';

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

  const SMALL = req.query.small;
  const LARGE = req.query.large;

  const response = await fetch(
    `https://mamalagels.com/wp-json/acf/v3/brunch_bag/6842?fields[small]=${SMALL}&fields[large]=${LARGE}`,
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
    // Cache the Wordpress response for 3 seconds
    res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
    res.status(200).json({
      success: [{ message: `${response.status}` }],
    });
  } else {
    res.status(400).json({
      errors: [
        {
          message: `Fetch to the Wordpress API failed with code: ${response.status}`,
        },
      ],
    });
  }
}
