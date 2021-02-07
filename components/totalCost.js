import React, { useEffect, useState } from 'react';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

const totalCost = ({ pricing }) => {
  const { state } = useStateMachine(updateAction);
  const priceHalfDozen = Number(pricing[0].node.prices.halfDozenPrice);
  const priceDozen = Number(pricing[0].node.prices.dozenPrice);
  const priceChips = Number(pricing[0].node.prices.bagelChipsPrice);

  useEffect(() => {
    const bagelChips = Object.values(state.data.bagelChips).reduce(
      (a, b) => a + b,
      0
    );
    const bagelDozens =
      state.data.bagelSelections.length > 0
        ? state.data.bagelSelections.filter(s => s.bagelSetType === 'dozen')
        : [];
    const bagelHalfDozens =
      state.data.bagelSelections.length > 0
        ? state.data.bagelSelections.filter(s => s.bagelSetType !== 'dozen')
        : [];

    let bagelDozenCost = bagelDozens.length * priceHalfDozen;
    let bagelHalfDozenCost = bagelHalfDozens.length * priceDozen;
    let bagelChipsCost = bagelChips * priceChips;
    state.data.totalCost = bagelDozenCost + bagelHalfDozenCost + bagelChipsCost;
  }, [state]);

  return (
    <div>
      <h4>Total: ${state.data.totalCost}</h4>
    </div>
  );
};

export default totalCost;