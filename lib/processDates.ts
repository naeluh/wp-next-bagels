import moment from 'moment';
import type { BrunchBagDay } from './processBrunchBags';
import type { BlackOutDate, Option } from './types';

const sameDay = (a: moment.MomentInput, b: moment.MomentInput) =>
  moment(a).isSame(moment(b));

/** Upcoming Sunday delivery dates, minus sold-out days and black-out dates. */
export default function processDates(
  data: BrunchBagDay[],
  bbDates: BlackOutDate[]
): Option[] {
  const afterThursday = moment().isAfter(moment().day(4));
  const start = afterThursday ? moment().day(4) : moment().day(-3);
  const end = afterThursday ? moment().add(28, 'd') : moment().add(21, 'd');

  const dates: Option[] = [];
  const tmp = start.clone().day(0);
  while (tmp.isBefore(end)) {
    tmp.add(7, 'days');
    dates.push({
      value: tmp.format('DD-MMM-YYYY'),
      label: tmp.format('dddd, MMMM D, YYYY'),
    });
  }
  dates.shift();

  const toDay = (value: string) =>
    moment.utc(value, 'DD-MMM-YYYY').format('DD-MMM-YYYY');

  return dates
    .filter(item =>
      data.every(
        ({ day, getLarge, getSmall }) =>
          !sameDay(
            moment.utc(day, 'DD-MMM-YYYY').format('DD-MMM-YYYY'),
            toDay(item.value)
          ) ||
          getLarge ||
          getSmall
      )
    )
    .filter(item =>
      bbDates.every(
        ({ blackOutDate }) =>
          !sameDay(
            moment.utc(blackOutDate, 'MM/DD/YYYY').format('DD-MMM-YYYY'),
            toDay(item.value)
          )
      )
    );
}
