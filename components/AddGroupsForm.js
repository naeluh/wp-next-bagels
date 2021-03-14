import React, { useEffect, useState } from 'react';
import styles from './addGroupsForm.module.css';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import BagelSetAddRemove from './BagelSetAddRemove';
import AddDateLocation from './AddDateLocation';
import BagelChipSetAddRemove from './BagelChipSetAddRemove';
import TotalCost from './TotalCost';
import Link from 'next/link';
import Button from './Button';

const AddGroupsForm = ({ pickupLocations, bagelChipsData, pricing }) => {
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const { state, actions } = useStateMachine({ updateAction });
  const [bagelID, setBagelID] = useState(state.data.bagelSelections.length);
  const [bagelChips, setBagelChips] = useState(0);
  const priceHalfDozen = Number(pricing[0].node.prices.halfDozenPrice);
  const priceDozen = Number(pricing[0].node.prices.dozenPrice);
  const priceChips = Number(pricing[0].node.prices.bagelChipsPrice);

  const locations = pickupLocations.map(({ node }) => {
    return {
      label: `${node.title}, ${node.location.locationAddress}`,
      value: node.title.toLowerCase().replace(/\s/g, '-'),
      locationData: node.location,
    };
  });

  const convertDateFormat = date =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatDate = date => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  const nextFourteenDays = () => {
    const curr = new Date();
    const first = curr.getDate();
    let dateArr = [];

    for (var i = 0; i < 18; i++) {
      let next = new Date(curr.getTime());
      next.setDate(first + i);
      dateArr.push({
        value: formatDate(next.toString()),
        label: convertDateFormat(next.toString()),
      });
    }
    dateArr = dateArr.slice(3);
    return dateArr;
  };

  useEffect(() => {
    setDates(nextFourteenDays(new Date()));
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

  const addGroup = type => {
    setBagelID(bagelID + 1);
    router.replace(
      `/bagels/add-bagels?bagelSelectionsID=${state.data.bagelSelections.length}&type=${type}`,
      `/bagels/add-bagels`
    );
  };

  return (
    <>
      <section className='my-8 border-b-4 border-m-yellow pb-8'>
        <AddDateLocation locations={locations} dates={dates} />
        <p className='text-lg my-4'>
          Pickup Location:{' '}
          {state.data.formattedLocation ? state.data.formattedLocation : ''}
        </p>
        <p className='text-lg'>
          Pickup Date:{' '}
          {state.data.formattedDate ? state.data.formattedDate : ''}
        </p>
      </section>
      <section className='my-8 border-b-4 border-m-yellow pb-4'>
        <p className='text-xl'>Bagels Chips:</p>
        <Link href={`/bagel-chips`} as={`/bagel-chips`}>
          <Button
            type={'button'}
            style={{ transition: 'all .15s ease' }}
            text={
              bagelChips > 0
                ? `Edit Bagel Chips - ${priceChips}.00`
                : `Add Bagel Chips - ${priceChips}.00`
            }
            disabled={false}
          />
        </Link>
        {state.data.bagelChips &&
          Object.entries(state.data.bagelChips).map((key, value) => (
            <BagelChipSetAddRemove
              show
              bagelChipValue={value}
              bagelChipKey={key}
              key={key}
            />
          ))}
      </section>{' '}
      <section className='pb-4 my-8 border-b-4 border-m-yellow'>
        <p className='text-xl'>Bagels:</p>
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={`Add Dozen - ${priceDozen}.00`}
          disabled={false}
          name='dozen'
          onClick={e => addGroup('dozen')}
        />
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={`Add 1/2 Dozen - ${priceHalfDozen}.00`}
          disabled={false}
          name='halfDozen'
          onClick={e => addGroup('halfDozen')}
        />
        {state.data.bagelSelections.length > 0 &&
          state.data.bagelSelections.map(bagelSelection => (
            <BagelSetAddRemove
              show
              bagelSelection={bagelSelection}
              key={bagelSelection.id}
            />
          ))}
      </section>
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
        />
      </section>
    </>
  );
};

export default AddGroupsForm;
