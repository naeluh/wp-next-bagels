import type { GlobalState } from 'little-state-machine';
import type { BagelValue } from './store';
import { DOZEN_NAME, bakersBonus } from './constants';

const desc = (data: GlobalState) => {
  const { bagelSelections, bagelChips, brunchBag, dozenName } = data.data;

  let bagelArray: BagelValue[] = [];
  let string = '';

  string += bagelSelections.length > 0 ? `Bagels<br>` : ``;

  for (let index = 0; index < bagelSelections.length; index++) {
    const bagelSet = bagelSelections[index];
    string +=
      bagelSet.bagelSetType === 'halfDozen'
        ? 'Half Dozen<br>'
        : `${dozenName || DOZEN_NAME}<br>`;
    for (let index = 0; index < bagelSet.bagels.length; index++) {
      const bagel = bagelSet.bagels[index];
      let bagelArrayData = bagel.value > 0 ? bagelArray.push(bagel) : ``;
      string +=
        bagel.value > 0
          ? `${bagel.key} ${bagel.value}${
              // bagelArrayData is push()'s number here, so .length is undefined (NaN compare, always `,`)
              bagelSet.bagels.length - 1 !==
              (bagelArrayData as unknown as string).length - 1
                ? `,`
                : `<br>`
            } `
          : ``;
    }
    if (bagelSet.bagelSetType !== 'halfDozen' && bakersBonus(dozenName)) {
      string += `${bakersBonus(dozenName)}<br>`;
    }
  }

  string +=
    Object.entries(bagelChips).filter(chip => chip[1] > 0).length > 0
      ? `Bagels Chips<br>`
      : ``;

  string += Object.entries(bagelChips)
    .filter(chip => chip[1] > 0)
    .map(chip => `${chip[0]} ${chip[1]} ${chip[1] >= 2 ? `bags` : `bag`}<br>`)
    .join('');

  const plural = (v: number) => (v >= 2 ? 'bagels' : 'bagel');

  string += brunchBag.bags.length > 0 ? `Brunch Bags<br>` : ``;

  string +=
    brunchBag.bags.length > 0
      ? brunchBag.bags.map(bag => {
          const bagels = bag.bagels.filter(bagel => bagel.value > 0);

          const bagDetails =
            bag.type === `small`
              ? '6 Farm Fresh Eggs, and Microgreens'
              : '12 Farm Fresh Eggs, and Microgreens';

          return bagels
            ? `${bagels.map(
                bagel => `${bagel.value} ${bagel.key} ${plural(bagel.value)}`
              )} ${bagDetails}`
            : ``;
        })
      : ``;

  return string;
};

export default desc;
