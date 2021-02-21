type Props = {
  data: any;
};

const desc = (data: Props) => {
  const state = data.data;
  console.log(state);
  let string = `Pickup Location: ${state.formattedLocation}<br> Pickup Date: ${state.formattedDate}<br><br>`;

  string += state.bagelSelections.map(
    (bagelSelection: any) =>
      `${
        bagelSelection.bagelSetType === 'halfDozen' ? 'Half Dozen' : 'Dozen'
      }<br>`
  );

  string += state.bagelSelections.map((bagelSelection: any) =>
    bagelSelection.bagels.map((bagel: any) => `${bagel.key} ${bagel.value}`)
  );

  console.log(string);

  return string;
};

export default desc;
