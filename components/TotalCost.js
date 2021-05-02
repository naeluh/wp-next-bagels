import React, { useEffect, useState } from 'react';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

const TotalCost = ({ pricing }) => {
  const { actions, state } = useStateMachine({ updateAction });
  const [cost, setCost] = useState(0);
  const priceHalfDozen = Number(pricing[0].node.prices.halfDozenPrice);
  const priceDozen = Number(pricing[0].node.prices.dozenPrice);
  const priceChips = Number(pricing[0].node.prices.bagelChipsPrice);
  const priceSmall = Number(pricing[0].node.prices.brunchBagSmall);
  const priceLarge = Number(pricing[0].node.prices.brunchBagLarge);

  useEffect(() => {
    const bagelChips = Object.values(state.data.bagelChips).reduce(
      (a, b) => a + b,
      0
    );
    const larges =
      state.data.brunchBag.bags.length > 0
        ? state.data.brunchBag.bags.filter(s => s.type === 'large')
        : [];
    const smalls =
      state.data.brunchBag.bags.length > 0
        ? state.data.brunchBag.bags.filter(s => s.type === 'small')
        : [];
    const bagelDozens =
      state.data.bagelSelections.length > 0
        ? state.data.bagelSelections.filter(s => s.bagelSetType === 'dozen')
        : [];
    const bagelHalfDozens =
      state.data.bagelSelections.length > 0
        ? state.data.bagelSelections.filter(s => s.bagelSetType !== 'dozen')
        : [];
    let largeCost = larges.length * priceLarge;
    let smallCost = smalls.length * priceSmall;
    let bagelDozenCost = bagelDozens.length * priceDozen;
    let bagelHalfDozenCost = bagelHalfDozens.length * priceHalfDozen;
    let bagelChipsCost = bagelChips * priceChips;
    setCost(
      bagelDozenCost +
        bagelHalfDozenCost +
        bagelChipsCost +
        largeCost +
        smallCost
    );
  }, [state]);

  useEffect(() => {
    actions.updateAction({
      totalCost: cost,
    });
  }, [cost]);

  return (
    <div>
      <p className='text-2xl font-serif font-black'>
        Total:{' '}
        <span className='font-normal font-sans'>
          ${state.data.totalCost}.00
        </span>
      </p>
    </div>
  );
};

export default TotalCost;
