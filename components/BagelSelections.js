import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './bagelSelections.module.css';
import ButtonsResult from './ButtonResult';
import BagelNumberField from './BagelNumberField';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import AlertModal from './AlertModal';

const BagelSelections = ({ bagelData }) => {
  const router = useRouter();
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

  const { handleSubmit, errors, control, reset, getValues, setValue } = useForm(
    {
      defaultValues,
    }
  );

  const [totalBagels, setTotalBagels] = useState(defaultValues.totalbagels);

  const amount =
    type === 'dozen' ? defaultValues.dozen : defaultValues.halfDozen;

  const bagelSet =
    state.data.bagelSelections &&
    router.query &&
    state.data.bagelSelections.filter(bagelSelection => {
      return bagelSelection.id === router.query.bagelSelectionsID;
    })[0];

  const onSubmit = data => {
    const vals = getValues();
    const output = Object.entries(vals).map(([key, value]) => ({ key, value }));
    state.data.bagelSelections[router.query.bagelSelectionsID] = {
      id: router.query.bagelSelectionsID,
      bagelSetType: router.query.type,
      bagels: output,
    };
    actions.updateAction({
      bagelSelections: state.data.bagelSelections,
    });
    router.push(`/bagels`);
  };

  useEffect(() => {
    if (!router.query) {
      router.push(`/bagels`);
    }
    if (bagelSet) {
      setType(bagelSet.bagelSetType);
      setId(bagelSet.id);
    } else if (router.query.bagelSelectionsID) {
      setType(router.query.type);
      setId(router.query.bagelSelectionsID);
    } else {
      router.push(`/bagels`);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(totalBagels === amount);
  }, [totalBagels]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`form ${totalBagels === amount ? styles.error : ``}`}
    >
      <section className='flex-col md:flex-column flex md:justify-between md:mb-4'>
        <h5 className='text-2xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
          Let's add a {` ${type === `halfDozen` ? `half dozen` : `dozen`}`}{' '}
          bagels ... Total Bagels: {totalBagels}
        </h5>
        <h6
          className={`${
            totalBagels === amount ? styles.limit : ``
          } text-2xl font-bold tracking-tighter leading-tight font-serif  text-black mb-4 py-4 px-8`}
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
              bagel.node.bagelInfo.bagelTitle && (
                <BagelNumberField
                  bagelSet={bagelSet}
                  amount={amount}
                  totalBagels={totalBagels}
                  setTotalBagels={setTotalBagels}
                  control={control}
                  bagel={bagel}
                  defaultValues={defaultValues}
                  key={bagel.node.bagelInfo.bagelTitle}
                />
              )
          )}
      </section>
    </form>
  );
};

export default BagelSelections;
