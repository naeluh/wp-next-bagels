type Props = {
  data: any;
};

const desc = (data: Props) => {
  const { bagelSelections, bagelChips, brunchBag } = data.data;

  let bagelArray: any = [];
  let string = '';

  string += bagelSelections.length > 0 ? `Bagels<br>` : ``;

  for (let index = 0; index < bagelSelections.length; index++) {
    const bagelSet = bagelSelections[index];
    string +=
      bagelSet.bagelSetType === 'halfDozen' ? 'Half Dozen<br>' : 'Dozen<br>';
    for (let index = 0; index < bagelSet.bagels.length; index++) {
      const bagel = bagelSet.bagels[index];
      let bagelArrayData = bagel.value > 0 ? bagelArray.push(bagel) : ``;
      string +=
        bagel.value > 0
          ? `${bagel.key} ${bagel.value}${
              bagelSet.bagels.length - 1 !== bagelArrayData.length - 1
                ? `,`
                : `<br>`
            } `
          : ``;
    }
  }

  string +=
    Object.entries(bagelChips).filter((chip: any) => chip[1] > 0).length > 0
      ? `Bagels Chips<br>`
      : ``;

  string += Object.entries(bagelChips)
    .filter((chip: any) => chip[1] > 0)
    .map(
      (chip: any) =>
        `${chip[0]} ${chip[1]} ${chip[1] >= 2 ? `bags` : `bag`}<br>`
    )
    .join('');

  const plural = (v: number) => (v >= 2 ? 'bagels' : 'bagel');

  string += brunchBag.bags.length > 0 ? `Brunch Bags<br>` : ``;

  string +=
    brunchBag.bags.length > 0
      ? brunchBag.bags.map((bag: any) => {
          const bagels = bag.bagels.filter((bagel: any) => bagel.value > 0);

          const bagDetails =
            bag.type === `small`
              ? '6 Farm Fresh Eggs, and Microgreens'
              : '12 Farm Fresh Eggs, and Microgreens';

          return bagels
            ? `${bagels.map(
                (bagel: any) =>
                  `${bagel.value} ${bagel.key} ${plural(bagel.value)}`
              )} ${bagDetails}`
            : ``;
        })
      : ``;

  return string;
};

export default desc;
