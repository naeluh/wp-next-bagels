import moment from 'moment';
import processDates from './processDates';

export default async function processBrunchBags(data, bbDates) {
  return new Promise(async (resolve, reject) => {
    if (!data) {
      reject(false);
      throw new Error('something went wrong with data');
    }

    let array = data.map(item => {
      let l = item?.bags?.filter(bag => bag?.type === 'large');
      let s = item?.bags?.filter(bag => bag?.type === 'small');
      let largeLength = l ? l.length : [];
      let smallLength = s ? s.length : [];
      if (item?.day) {
        return {
          day: moment(item.day),
          large: l?.length,
          small: s?.length,
          getLarge: largeLength <= 10 ? true : false,
          getSmall: smallLength <= 10 ? true : false,
        };
      } else {
        return {
          day: '',
          large: 10,
          small: 10,
          getLarge: true,
          getSmall: true,
        };
      }
    });

    const d = await processDates(array, bbDates);

    const object = {
      dates: d,
      bb: array,
    };

    resolve(object);
    return object;
  });
}
