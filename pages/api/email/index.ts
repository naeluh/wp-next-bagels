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
    fee,
  } = req.query;

  const DESC = desc ? desc : null;
  const EMAIL = email ? email : null;
  const PHONE = phone ? phone : null;
  const NAME = name ? name : null;
  const COST = cost ? cost : null;
  const LOCATION = location ? location : null;
  const TIME = time ? time : null;
  const ADDRESS_ONE = addresOne ? addresOne : null;
  const ADDRESS_TWO = addresTwo ? addresTwo : null;
  const CITY = city ? city : null;
  const STATE = state ? state : null;
  const ZIP = zip ? zip : null;
  const DELIVERY_DATE = deliveryDate ? deliveryDate : null;
  const FEE = fee ? fee : null;

  const response = await fetch(
    encodeURI(
      `https://receipts.mamalagels.com/receipt?desc=${DESC}&name=${NAME}&phone=${PHONE}&email=${EMAIL}&time=${TIME}&location=${LOCATION}&cost=${COST}&addresOne=${ADDRESS_ONE}&addresTwo=${ADDRESS_TWO}&city=${CITY}&state=${STATE}&zip=${ZIP}&deliveryDate=${DELIVERY_DATE}&fee=${FEE}`
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
