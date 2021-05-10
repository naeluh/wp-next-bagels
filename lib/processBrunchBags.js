import moment from 'moment';
import processDates from './processDates';

export default async function processBrunchBags(data) {
  return new Promise(async (resolve, reject) => {
    if (!data) {
      reject(false);
      throw new Error('something went wrong with data');
    }

    let array = data.map(item => {
      let l = item?.bags?.filter(bag => bag?.type === 'large');
      let s = item?.bags?.filter(bag => bag?.type === 'small');
      return {
        day: moment(item.day),
        large: l?.length,
        small: s?.length,
        getLarge: l?.length <= 10 ? true : false,
        getSmall: s?.length <= 10 ? true : false,
      };
    });

    const d = await processDates(array);

    const object = {
      dates: d,
      bb: array,
    };

    resolve(object);
    return object;
  });
}
