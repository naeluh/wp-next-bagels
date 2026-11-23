'use client';

import React, { useEffect, useState } from 'react';
import styles from './addGroupsForm.module.css';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/navigation';
import AddDateLocation from './AddDateLocation';
import TotalCost from './TotalCost';
import Button from './Button';
import BagelChipsOrderModal from './BagelChipsOrderModal';
import BagelSelectionsModal from './BagelSelectionsModal';
import BagelChipSetAddRemove from './BagelChipSetAddRemove';
import BagelSetAddRemove from './BagelSetAddRemove';
import { DOZEN_NAME } from '../lib/constants';
import type {
  Bagel,
  BagelChip,
  Edge,
  PickupLocation,
  Prices,
} from '../lib/types';

type Props = {
  pickupLocations: Edge<PickupLocation>[];
  bagelChipsData: Edge<BagelChip>[];
  bagelData: Edge<Bagel>[];
  pricing: Edge<{ prices: Prices }>[];
};

const AddGroupsForm = ({
  pickupLocations,
  bagelChipsData,
  bagelData,
  pricing,
}: Props) => {
  const router = useRouter();
  const { state, actions } = useStateMachine({ actions: { updateAction } });
  const [bagelID, setBagelID] = useState(state.data.bagelSelections.length);
  const [bagelChips, setBagelChips] = useState(0);
  const priceHalfDozen = Number(pricing[0].node.prices.halfDozenPrice);
  const priceDozen = Number(pricing[0].node.prices.dozenPrice);
  const dozenName = pricing[0].node.prices.dozenName || DOZEN_NAME;
  const priceChips = Number(pricing[0].node.prices.bagelChipsPrice);

  const [bagelSetId, setBagelSetId] = useState(
    state.data.bagelSelections.length
  );
  const [bagelSetType, setBagelSetType] = useState('');
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChipModal, setShowChipModal] = useState(false);

  const addGroup = (type: string) => {
    actions.updateAction({ dozenName });
    setBagelID(bagelID + 1);
    setBagelSetType(type);
    setBagelSetId(state.data.bagelSelections.length);
    setOpen(!open);
    setShowModal(!showModal);
  };

  const editGroup = (type: string, id: number) => {
    setBagelSetType(type);
    setBagelSetId(id);
    setOpen(!open);
    setShowModal(!showModal);
  };

  const addChipGroup = () => {
    setShowChipModal(!showChipModal);
  };

  const locations = pickupLocations.map(({ node }) => {
    return {
      label: `${node.title}, ${node?.location?.locationAddress}`,
      value: node.title.toLowerCase().replace(/\s/g, '-'),
      locationData: node.location,
    };
  });

  useEffect(() => {
    setBagelID(state.data.bagelSelections.length);
    actions.updateAction({
      bagelChipData: bagelChipsData.map(({ node }) => {
        return {
          id: node.databaseId,
          quantity: node.bagelChipsDetails.quantity,
          title: node.title,
        };
      }),
    });
  }, []);

  return (
    <>
      <section className='my-8 border-b-8 border-m-yellow pb-8'>
        <AddDateLocation locations={locations} />
        <p className='text-lg my-4'>
          <span className='text-xl font-serif font-black'>Pickup Location</span>
          : {state.data.formattedLocation ? state.data.formattedLocation : ''}
        </p>
        <p className='text-lg'>
          <span className='text-xl font-serif font-black'>Pickup Date</span>:{' '}
          {state.data.formattedDate ? state.data.formattedDate : ''}
        </p>
      </section>

      <section className='pb-4 my-8 border-b-8 border-m-yellow'>
        <p className='text-xl'>
          <span className='text-xl font-serif font-black'>Bagels</span>:
        </p>
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={`Add ${dozenName} - ${priceDozen}.00`}
          disabled={false}
          onClick={e => addGroup('dozen')}
          fullWidth={false}
        />
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={`Add 1/2 Dozen - ${priceHalfDozen}.00`}
          disabled={false}
          onClick={e => addGroup('halfDozen')}
          fullWidth={false}
        />
        {state.data.bagelSelections.length > 0 &&
          state.data.bagelSelections.map(bagelSelection => (
            <BagelSetAddRemove
              show
              bagelSelection={bagelSelection}
              editGroup={editGroup}
              key={bagelSelection.id}
            />
          ))}
      </section>
      <BagelSelectionsModal
        show={open}
        setShowModal={setShowModal}
        showModal={showModal}
        bagelData={bagelData}
        bagelSetType={bagelSetType}
        bagelSelectionsID={bagelSetId}
      />
      <section className='my-8'>
        <TotalCost pricing={pricing} />
      </section>
      <section className={`${styles.grid} mb-12`}>
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={'Checkout'}
          disabled={state.data.totalCost > 0 ? false : true}
          onClick={() => state.data.totalCost > 0 && router.push('/checkout')}
          fullWidth
        />
      </section>
    </>
  );
};

export default AddGroupsForm;
