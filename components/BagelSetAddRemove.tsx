'use client';

import React from 'react';
import Link from 'next/link';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import Button from './Button';
import type { BagelSet } from '../lib/store';
import { DOZEN_NAME, bakersBonus } from '../lib/constants';

type Props = {
  editGroup: (type: string, id: number) => void;
  bagelSelection: BagelSet;
  show: boolean;
};

const BagelSetAddRemove = ({ editGroup, bagelSelection, show }: Props) => {
  const { state, actions } = useStateMachine({ actions: { updateAction } });
  const removeBagelSet = (array: BagelSet[], value: number) => {
    actions.updateAction({
      bagelSelections: array.filter(item => {
        return item.id !== value;
      }),
    });
  };

  const bagels = bagelSelection.bagels.filter(({ value }) => value > 0);

  const plural = (v: number) => (v >= 2 ? 'bagels' : 'bagel');

  return (
    <div className='my-4'>
      <h4 className='font-serif font-black leading-tight text-lg text-m-black mb-2'>
        {bagelSelection.bagelSetType === `halfDozen`
          ? `Half Dozen`
          : state.data.dozenName || DOZEN_NAME}
      </h4>
      <p>
        {bagels.map((bagel, index) => (
          <span className='text-lg' key={bagel.key}>
            {bagel.value} {bagel.key} {plural(bagel.value)}
            {bagels.length >= 2 && bagels.length - 1 !== index && `,`}&nbsp;
          </span>
        ))}
        {bagelSelection.bagelSetType !== `halfDozen` && (
          <span className='text-lg'>{bakersBonus(state.data.dozenName)}</span>
        )}
      </p>
      {show && (
        <>
          <p className='inline-block mr-4'>
            <Button
              type={'button'}
              text={'Edit'}
              style={{ transition: 'all .15s ease' }}
              disabled={false}
              fullWidth={false}
              onClick={() => {
                editGroup(bagelSelection.bagelSetType, bagelSelection.id);
              }}
            />
          </p>
          <p className='inline-block'>
            <Button
              type={'button'}
              text={'Remove'}
              style={{ transition: 'all .15s ease' }}
              disabled={false}
              fullWidth={false}
              onClick={() =>
                removeBagelSet(state.data.bagelSelections, bagelSelection.id)
              }
            />
          </p>
        </>
      )}
    </div>
  );
};

export default BagelSetAddRemove;
