export default async function processBrunchBags(data) {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject(false);
      throw new Error('something went wrong with data');
    }

    let array = data.map(item => {
      let l = item?.bags?.filter(bag => bag?.type === 'large');
      let s = item?.bags?.filter(bag => bag?.type === 'small');
      let getL = l?.length <= 10 ? true : false;
      let getS = s?.length <= 10 ? true : false;

      return {
        day: item.day,
        large: l.length,
        small: s.length,
        getLarge: getL,
        getSmall: getS,
      };
    });

    resolve(array);
    return array;
  });
}
