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

  const locations = pickupLocations.map(({ node }) => {
    return {
      label: `${node.location.locationName}, ${node.location.locationAddress}`,
      value: node.location.locationName.toLowerCase().replace(/\s/g, '-'),
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
      <section className='my-4'>
        <AddDateLocation locations={locations} dates={dates} />
        <p>
          Pickup Location:{' '}
          {state.data.formattedLocation ? state.data.formattedLocation : ''}
        </p>
        <p>
          Pickup Date:{' '}
          {state.data.formattedDate ? state.data.formattedDate : ''}
        </p>
      </section>
      <section>
        <p>Bagels Chips:</p>
        <Link href={`/bagel-chips`} as={`/bagel-chips`}>
          <Button
            type={'button'}
            style={{ transition: 'all .15s ease' }}
            text={bagelChips > 0 ? `Edit Bagel Chips` : `Add Bagel Chips`}
            disabled={false}
          />
        </Link>
        {state.data.bagelChips &&
          Object.entries(state.data.bagelChips).map((key, value) => (
            <BagelChipSetAddRemove
              bagelChipValue={value}
              bagelChipKey={key}
              key={key}
            />
          ))}
      </section>
      <section>
        <p>Bagels:</p>
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={'Add Dozen'}
          disabled={false}
          name='dozen'
          onClick={e => addGroup('dozen')}
        />
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={'Add 1/2 Dozen'}
          disabled={false}
          name='halfDozen'
          onClick={e => addGroup('halfDozen')}
        />
        {state.data.bagelSelections.length > 0 &&
          state.data.bagelSelections.map(bagelSelection => (
            <BagelSetAddRemove
              bagelSelection={bagelSelection}
              key={bagelSelection.id}
            />
          ))}
      </section>
      <section className='my-4'>
        <TotalCost pricing={pricing} />
      </section>
      <section className={styles.grid}>
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
