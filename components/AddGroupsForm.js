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

const AddGroupsForm = ({ pickupLocations, bagelChipsData, pricing }) => {
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const { state, action } = useStateMachine(updateAction);
  const [bagelID, setBagelID] = useState(state.data.bagelSelections.length);
  const [bagelChips, setBagelChips] = useState(0);

  const locations = pickupLocations.map(({ node }) => {
    return {
      label: node.location.locationName,
      value: node.location.locationName.toLowerCase().replace(/\s/g, '-'),
      locationData: node.location,
    };
  });

  const convertLocation = (location, locations) =>
    locations.filter(l => location === l.value)[0].label;

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

  const nextSevenDays = () => {
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
    setDates(nextSevenDays(new Date()));
    setBagelID(state.data.bagelSelections.length);
    setBagelChips(
      Object.keys(state.data.bagelChips)
        .map(key => state.data.bagelChips[key])
        .reduce((a, b) => a + b, 0)
    );
    action({
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
          {state.data.location
            ? convertLocation(state.data.location, locations)
            : ''}
        </p>
        <p>
          Pickup Date:{' '}
          {state.data.time ? convertDateFormat(state.data.time) : ''}
        </p>
      </section>
      <section>
        <p>Bagels Chips:</p>
        <Link href={`/bagel-chips`} as={`/bagel-chips`}>
          <button
            className='bagelBackgroundYellow text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
            type='button'
            style={{ transition: 'all .15s ease' }}
          >
            {bagelChips > 0 ? `Edit Bagel Chips` : `Add Bagel Chips`}
          </button>
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
        <button
          className='bagelBackgroundYellow text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
          type='button'
          style={{ transition: 'all .15s ease' }}
          name='dozen'
          onClick={e => addGroup('dozen')}
          variant='outlined'
        >
          Add Dozen
        </button>
        <button
          className='bagelBackgroundYellow text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
          type='button'
          style={{ transition: 'all .15s ease' }}
          name='halfDozen'
          onClick={e => addGroup('halfDozen')}
          variant='outlined'
        >
          Add 1/2 Dozen
        </button>
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
        <Link href='/checkout'>
          <a className='card elements-style-background'>
            <button
              className='bagelBackgroundYellow text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
              type='button'
              style={{ transition: 'all .15s ease' }}
            >
              Checkout
            </button>
          </a>
        </Link>
      </section>
      <section>
        {state && (
          <pre style={{ textAlign: 'left' }}>
            {JSON.stringify(state, null, 2)}
          </pre>
        )}
      </section>
    </>
  );
};

export default AddGroupsForm;
