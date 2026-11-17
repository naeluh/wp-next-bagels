'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { error } from './bagelSelections.module.css';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter, useSearchParams } from 'next/navigation';
import AlertModal from './AlertModal';
import ButtonsResult from './ButtonResult';
import BagelNumberField from './BagelNumberField';

const BagelSelections = ({ bagelData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bagelSelectionsID = searchParams.get('bagelSelectionsID');
  const typeQuery = searchParams.get('type');

  const { actions, state } = useStateMachine({ updateAction });
  const [data] = useState(null);
  const [type, setType] = useState('');
  const [id, setId] = useState('');

  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelVal: 0,
    totalbagels: 0,
  };

  const { handleSubmit, reset, getValues } = useForm({
    defaultValues,
  });

  const [totalBagels, setTotalBagels] = useState(defaultValues.totalbagels);

  const amount =
    type === 'dozen' ? defaultValues.dozen : defaultValues.halfDozen;

  const bagelSet =
    state.data.bagelSelections &&
    bagelSelectionsID &&
    state.data.bagelSelections.filter(bagelSelection => {
      return bagelSelection.id === bagelSelectionsID;
    })[0];

  const onSubmit = () => {
    const vals = getValues();
    const output = Object.entries(vals).map(([key, value]) => ({
      key,
      value,
    }));
    if (!bagelSelectionsID) return;
    state.data.bagelSelections[bagelSelectionsID] = {
      id: bagelSelectionsID,
      bagelSetType: typeQuery,
      bagels: output,
    };
    actions.updateAction({
      bagelSelections: state.data.bagelSelections,
    });
    router.push(`/bagels`);
  };

  useEffect(() => {
    if (!bagelSelectionsID && !typeQuery) {
      router.push(`/bagels`);
      return;
    }
    if (bagelSet) {
      setType(bagelSet.bagelSetType);
      setId(bagelSet.id);
    } else if (bagelSelectionsID) {
      setType(typeQuery || '');
      setId(bagelSelectionsID);
    } else {
      router.push(`/bagels`);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(totalBagels === amount);
    if (totalBagels === amount) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [totalBagels]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`form ${totalBagels === amount ? error : ``}`}
    >
      <section className='flex-col md:flex-column flex md:justify-between md:mb-4'>
        <h5 className='text-2xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
          Let's add a {` ${type === `halfDozen` ? `half dozen` : `dozen`}`}{' '}
          bagels ...
        </h5>
        <h6
          className={`${
            totalBagels === amount ? `px-8` : ``
          } text-2xl font-bold tracking-tighter leading-tight font-serif  text-black mb-4 py-4`}
        >
          Total Bagels: {totalBagels}
        </h6>
        <p>
          <AlertModal
            showModal={showModal}
            setShowModal={setShowModal}
            alertText={`You have reached the limit of ${amount}, reduced the amount of one of your selections or go back and add another dozen or half dozen`}
          />
        </p>
      </section>
      <section className='w-full mb-8 flex items-center justify-center'>
        <ButtonsResult
          {...{ data, reset, defaultValues, totalBagels, amount }}
        />
      </section>
      <section className='flex-col md:flex-column flex md:justify-between'>
        {bagelData &&
          bagelData.map(
            bagel =>
              bagel.node.title && (
                <BagelNumberField
                  bagelSet={bagelSet}
                  amount={amount}
                  totalBagels={totalBagels}
                  setTotalBagels={setTotalBagels}
                  getValues={getValues}
                  bagel={bagel}
                  defaultValues={defaultValues}
                  key={bagel.node.title}
                />
              )
          )}
      </section>
    </form>
  );
};

export default BagelSelections;
