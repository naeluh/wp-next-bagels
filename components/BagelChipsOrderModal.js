import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import BagelChipNumberField from './BagelChipNumberField';
import Button from './Button';
import Modal from './Modal';
import { positionFixed } from './bagelSelections.module.css';

const BagelChipsOrderModal = ({ bagelChipsData, showModal, setShowModal }) => {
  const { state, actions } = useStateMachine({ updateAction });
  const defaultValues = {
    bagelChipVal: 0,
  };
  const [allBagelChipsEmpty, setAllBagelChipsEmpty] = useState(false);

  const { handleSubmit, errors, register, setValue } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = data => {
    actions.updateAction({
      bagelChips: data,
    });
    setShowModal(!showModal);
  };

  useEffect(() => {
    setAllBagelChipsEmpty(
      bagelChipsData.filter(
        bagelChip =>
          bagelChip.node.bagelChipsDetails.quantity > 0 &&
          bagelChip.node.bagelChipsDetails.quantity !== null
      ).length === 0
    );
  }, []);

  const checkBagelChipNode = bagelChip =>
    (bagelChip.node.bagelChipsDetails.isThisBagelChipTypeAvailable !== null &&
      bagelChip.node.bagelChipsDetails.quantity > 0) ||
    bagelChip.node.bagelChipsDetails.quantity !== null;

  return (
    <Modal
      button={`bagels`}
      title={`bagel chips`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideButton={true}
    >
      {!allBagelChipsEmpty ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-flow-row grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4 xl:grid-rows-4 md:gap-4'>
            {bagelChipsData.map(
              bagelChip =>
                checkBagelChipNode(bagelChip) && (
                  <BagelChipNumberField
                    register={register}
                    defaultValues={defaultValues}
                    bagelChip={bagelChip}
                    key={bagelChip.node.databaseId}
                    errors={errors}
                    setValue={setValue}
                    state={state}
                  />
                )
            )}
          </div>
          <section
            className={`flex-col md:flex-column flex md:justify-between ${positionFixed}`}
          >
            <Button
              type={'submit'}
              text={'Submit '}
              disabled={false}
              style={{ transition: 'all .15s ease' }}
              fullWidth={false}
            />
          </section>
        </form>
      ) : (
        <section className='flex-col md:flex-column flex md:justify-between mb-16 md:mb-12'>
          <span className='font-serif font-bold leading-tight text-lg text-m-black'>
            No bagel chips are available currently, try back again later. Thanks
            !
          </span>

          <Button
            type={'button'}
            text={'Back to Bagel order page!'}
            style={{ transition: 'all .15s ease' }}
            disabled={false}
            fullWidth={false}
            onClick={() => {
              setShowModal(!showModal);
            }}
          />
        </section>
      )}
    </Modal>
  );
};

export default BagelChipsOrderModal;
