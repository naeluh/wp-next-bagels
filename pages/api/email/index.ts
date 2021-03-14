import fetch from '../../../lib/fetch';

export default async function emailPost(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const DESC = req.query.desc;
  const EMAIL = req.query.email;
  const PHONE = req.query.phone;
  const NAME = req.query.name;
  const COST = req.query.cost;
  const LOCATION = req.query.location;
  const TIME = req.query.time;
  console.log(req.query);

  const response = await fetch(
    encodeURI(
      `https://receipts.mamalagels.com/receipt?desc=${DESC}&name=${NAME}&phone=${PHONE}&email=${EMAIL}&time=${TIME}&location=${LOCATION}&cost=${COST}`
    )
  );

  if (response.ok) {
    // Cache the email response for 3 seconds
    res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');
    res.status(200).json({
      success: [{ message: `${response.status}` }],
    });
  } else {
    res.status(400).json({
      errors: [
        {
          message: `Fetch to the Email API failed with code: ${response.status}`,
        },
      ],
    });
  }
}
