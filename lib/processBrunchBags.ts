import moment from 'moment';
import processDates from './processDates';
import type { BlackOutDate, BookedDay } from './types';

export type BrunchBagDay = {
  day: moment.Moment | '';
  large: number;
  small: number;
  getLarge: boolean;
  getSmall: boolean;
};

export default async function processBrunchBags(
  data: BookedDay[] | undefined,
  bbDates: BlackOutDate[]
) {
  if (!data) {
    throw new Error('something went wrong with data');
  }

  const bb: BrunchBagDay[] = data.map(item => {
    if (!item?.day) {
      return { day: '', large: 10, small: 10, getLarge: true, getSmall: true };
    }
    const large = item.bags?.filter(bag => bag?.type === 'large').length ?? 0;
    const small = item.bags?.filter(bag => bag?.type === 'small').length ?? 0;
    return {
      day: moment(item.day),
      large,
      small,
      getLarge: large <= 10,
      getSmall: small <= 10,
    };
  });

  return { dates: processDates(bb, bbDates), bb };
}
