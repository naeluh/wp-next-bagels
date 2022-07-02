import React, { useEffect, useState } from 'react';
import { grid } from './addGroupsForm.module.css';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import AddDateLocation from './AddDateLocation';
import TotalCost from './TotalCost';
import Button from './Button';
import BagelChipsOrderModal from './BagelChipsOrderModal';
import BagelSelectionsModal from './BagelSelectionsModal';
import BagelChipSetAddRemove from './BagelChipSetAddRemove';
import BagelSetAddRemove from './BagelSetAddRemove';

const AddGroupsForm = ({
  pickupLocations,
  bagelChipsData,
  bagelData,
  pricing,
}) => {
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const { state, actions } = useStateMachine({ updateAction });
  const [bagelID, setBagelID] = useState(state.data.bagelSelections.length);
  const [bagelChips, setBagelChips] = useState(0);
  const priceHalfDozen = Number(pricing[0].node.prices.halfDozenPrice);
  const priceDozen = Number(pricing[0].node.prices.dozenPrice);
  const priceChips = Number(pricing[0].node.prices.bagelChipsPrice);

  const [bagelSetId, setBagelSetId] = useState(
    state.data.bagelSelections.length
  );
  const [bagelSetType, setBagelSetType] = useState('');
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChipModal, setShowChipModal] = useState(false);

  const addGroup = type => {
    setBagelID(bagelID + 1);
    setBagelSetType(type);
    setBagelSetId(state.data.bagelSelections.length);
    setOpen(!open);
    setShowModal(!showModal);
  };

  const editGroup = (type, id) => {
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

  const mutateDateArray = dates => {
    let dateArr = [];
    if (!dates) return dateArr;
    dateArr = dates.map(({ locationDate }) => {
      return {
        value: formatDate(locationDate.toString()),
        label: convertDateFormat(locationDate.toString()),
      };
    });
    return dateArr;
  };

  useEffect(() => {
    setDates(mutateDateArray(pickupLocations?.location?.locationDates));
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
        <AddDateLocation locations={locations} dates={dates} />
        <p className='text-lg my-4'>
          <span className='text-xl font-serif font-black'>Pickup Location</span>
          : {state.data.formattedLocation ? state.data.formattedLocation : ''}
        </p>
        <p className='text-lg'>
          <span className='text-xl font-serif font-black'>Pickup Date</span>:{' '}
          {state.data.formattedDate ? state.data.formattedDate : ''}
        </p>
      </section>
      <section className='my-8 border-b-8 border-m-yellow pb-4'>
        <p className='text-xl'>
          {' '}
          <span className='text-xl font-serif font-black'>Bagels Chips</span>:
        </p>

        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={
            bagelChips > 0
              ? `Edit Bagel Chips - ${priceChips}.00`
              : `Add Bagel Chips - ${priceChips}.00`
          }
          onClick={() => {
            addChipGroup();
          }}
          disabled={false}
          fullWidth={false}
        />

        <BagelChipsOrderModal
          show={open}
          setShowModal={setShowChipModal}
          showModal={showChipModal}
          bagelChipsData={bagelChipsData}
        />

        {state.data.bagelChips &&
          Object.entries(state.data.bagelChips).map((key, value) => (
            <BagelChipSetAddRemove
              show
              bagelChipValue={value}
              bagelChipKey={key}
              key={value}
              editChipGroup={editChipGroup}
            />
          ))}
      </section>{' '}
      <section className='pb-4 my-8 border-b-8 border-m-yellow'>
        <p className='text-xl'>
          <span className='text-xl font-serif font-black'>Bagels</span>:
        </p>
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={`Add Dozen - ${priceDozen}.00`}
          disabled={false}
          name='dozen'
          onClick={e => addGroup('dozen')}
          fullWidth={false}
        />
        <Button
          type={'button'}
          style={{ transition: 'all .15s ease' }}
          text={`Add 1/2 Dozen - ${priceHalfDozen}.00`}
          disabled={false}
          name='halfDozen'
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
      <section className={`${grid} mb-12`}>
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
