import fetch from '../../../lib/fetch';

export default async function emailPost(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const {
    desc,
    email,
    phone,
    name,
    cost,
    location,
    time,
    addresOne,
    addresTwo,
    city,
    state,
    zip,
    deliveryDate,
  } = req.query;

  const DESC = desc ? desc : ``;
  const EMAIL = email ? email : ``;
  const PHONE = phone ? phone : ``;
  const NAME = name ? name : ``;
  const COST = cost ? cost : ``;
  const LOCATION = location ? location : ``;
  const TIME = time ? time : ``;
  const ADDRESS_ONE = addresOne ? addresOne : ``;
  const ADDRESS_TWO = addresTwo ? addresTwo : ``;
  const CITY = city ? city : ``;
  const STATE = state ? state : ``;
  const ZIP = zip ? zip : ``;
  const DELIVERY_DATE = deliveryDate ? deliveryDate : ``;

  const response = await fetch(
    encodeURI(
      `https://receipts.mamalagels.com/receipt?desc=${DESC}&name=${NAME}&phone=${PHONE}&email=${EMAIL}&time=${TIME}&location=${LOCATION}&cost=${COST}&addresOne=${ADDRESS_ONE}&addresTwo=${ADDRESS_TWO}&city=${CITY}&state=${STATE}&zip=${ZIP}&deliveryDate=${DELIVERY_DATE}`
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
