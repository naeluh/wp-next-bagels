import moment from 'moment';

export default async function processDates(data, bbDates) {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject(false);
      throw new Error('something went wrong with data');
    }

    // Get list of days
    let start;
    let end;

    if (moment().isAfter(moment().day(4))) {
      start = moment().day(4);
      end = moment().add(28, 'd');
    } else {
      start = moment().day(-3);
      end = moment().add(21, 'd');
    }

    let arr = [];
    let tmp = start.clone().day(0);

    if (tmp.isAfter(start, 'd')) {
      arr.push(tmp.format('dddd, MMMM D, YYYY'));
    }

    while (tmp.isBefore(end)) {
      tmp.add(7, 'days');

      arr.push({
        value: tmp.format('DD-MMM-YYYY'),
        label: tmp.format('dddd, MMMM D, YYYY'),
      });
    }

    arr.shift();

    // Filter days based on data from server
    arr = arr.filter(function (item) {
      for (let index = 0; index < data.length; index++) {
        const { day, getLarge, getSmall } = data[index];
        const bbDay = moment.utc(day, 'DD-MMM-YYYY').format('DD-MMM-YYYY');
        const date = moment
          .utc(item.value, 'DD-MMM-YYYY')
          .format('DD-MMM-YYYY');
        if (moment(bbDay).isSame(moment(date))) {
          if (!getLarge && !getSmall) {
            return false;
          }
        }
      }

      return true;
    });

    arr = arr.filter(function (item) {
      for (let index = 0; index < bbDates.length; index++) {
        const { blackOutDate } = bbDates[index];
        const blackOutDay = moment
          .utc(blackOutDate, 'MM/DD/YYYY')
          .format('DD-MMM-YYYY');
        const date = moment
          .utc(item.value, 'DD-MMM-YYYY')
          .format('DD-MMM-YYYY');
        if (moment(blackOutDay).isSame(moment(date))) {
          return false;
        }
      }

      return true;
    });

    resolve(arr);
    return arr;
  });
}
