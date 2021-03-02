type Props = {
  data: any;
};

const desc = (data: Props) => {
  const state = data.data;
  let bagelArray: any = [];
  let string = `<br>Pickup Location: ${state.formattedLocation}<br> Pickup Date: ${state.formattedDate}<br><br>`;
  string += state.bagelSelections.length > 0 ? `Bagels <br>` : ``;
  for (let index = 0; index < state.bagelSelections.length; index++) {
    const bagelSet = state.bagelSelections[index];
    string +=
      bagelSet.bagelSetType === 'halfDozen' ? 'Half Dozen<br> ' : 'Dozen<br> ';
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
    Object.entries(state.bagelChips).filter((chip: any) => chip[1] > 0).length >
    0
      ? `Bagels Chips <br>`
      : ``;
  string += Object.entries(state.bagelChips)
    .filter((chip: any) => chip[1] > 0)
    .map(
      (chip: any) =>
        `${chip[0]} ${chip[1]} ${chip[1] >= 2 ? `bags` : `bag`} <br>`
    )
    .join('');
  string += `Total Cost: ${state.totalCost + 1}.00<br>`;
  string += `<br>`;
  return string;
};

export default desc;
