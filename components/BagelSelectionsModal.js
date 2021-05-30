import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { limit, error } from './bagelSelections.module.css';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import AlertModal from './AlertModal';
import BagelNumberField from './BagelNumberField';
import Modal from './Modal';

const BagelSelectionsModal = ({
  showModal,
  setShowModal,
  bagelData,
  bagelSetType,
  bagelSelectionsID,
}) => {
  const { actions, state } = useStateMachine({ updateAction });
  const [data] = useState(null);
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  const [showAlertModal, setAlertShowModal] = useState(false);

  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelVal: 0,
    totalbagels: 0,
  };

  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues,
  });

  const [totalBagels, setTotalBagels] = useState(defaultValues.totalbagels);

  const amount =
    type === 'dozen' ? defaultValues.dozen : defaultValues.halfDozen;

  const bagelSet =
    state.data.bagelSelections &&
    state.data.bagelSelections.filter(bagelSelection => {
      return bagelSelection.id === bagelSelectionsID;
    })[0];

  const onSubmit = data => {
    const vals = getValues();
    const output = Object.entries(vals).map(([key, value]) => ({ key, value }));
    state.data.bagelSelections[bagelSelectionsID] = {
      id: bagelSelectionsID,
      bagelSetType: bagelSetType,
      bagels: output,
    };
    actions.updateAction({
      bagelSelections: state.data.bagelSelections,
    });
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (bagelSet) {
      setType(bagelSet.bagelSetType);
      setId(bagelSet.id);
    } else {
      setType(bagelSetType);
      setId(bagelSelectionsID);
    }
  }, [type, bagelSetType, bagelSelectionsID]);

  useEffect(() => {
    setAlertShowModal(totalBagels === amount);
    if (totalBagels === amount) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [totalBagels]);

  return (
    <Modal
      button={`bagels`}
      title={`bagels`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideButton={true}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form ${totalBagels === amount ? error : ``}`}
      >
        <section className='flex-col md:flex-column flex md:justify-between md:mb-4'>
          <h5 className='text-2xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 text-black'>
            Let's add a {` ${type === `halfDozen` ? `half dozen` : `dozen`}`}{' '}
            bagels ...
          </h5>
          <p>
            <AlertModal
              showModal={showAlertModal}
              setShowModal={setAlertShowModal}
              alertText={`You have reached the limit of ${amount} 🥯 for this 🥯 selection, reduce the amount of one of your 🥯 or submit your 🥯 !`}
              buttonProps={(data, reset, defaultValues, totalBagels, amount)}
            />
          </p>
        </section>
        <section className='grid grid-flow-row grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 xl:grid-cols-4 xl:grid-rows-4 md:gap-4'>
          {bagelData &&
            bagelData.map(
              bagel =>
                bagel.node.title && (
                  <BagelNumberField
                    bagelSet={bagelSet}
                    amount={amount}
                    totalBagels={totalBagels}
                    setTotalBagels={setTotalBagels}
                    control={control}
                    bagel={bagel}
                    defaultValues={defaultValues}
                    key={bagel.node.title}
                  />
                )
            )}
        </section>
        <section style={{ height: '120px' }}></section>
      </form>
    </Modal>
  );
};

export default BagelSelectionsModal;
