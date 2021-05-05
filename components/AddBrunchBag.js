import React, { useEffect, useState } from 'react';
import { grid } from './addBrunchBag.module.css';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import AddDateBrunchBag from './AddDateBrunchBag';
import TotalCost from './TotalCost';
import Button from './Button';
import BrunchBagBagelSelectionsModal from './BrunchBagBagelSelectionsModal';
import BrunchBagAddRemove from './BrunchBagAddRemove';

const AddBrunchBag = ({ bagelData, pricing, brunchBag }) => {
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const { state, actions } = useStateMachine({ updateAction });
  const [bagelID, setBagelID] = useState(state.data.brunchBag.bags.length);
  const priceSmall = Number(pricing[0].node.prices.brunchBagSmall);
  const priceLarge = Number(pricing[0].node.prices.brunchBagLarge);
  const [brunchBagType, setBrunchBagType] = useState('');
  const [brunchBagID, setBrunchBagId] = useState(
    state.data.brunchBag.bags.length
  );
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const addGroup = type => {
    setBagelID(bagelID + 1);
    setBrunchBagType(type);
    setBrunchBagId(state.data.brunchBag.bags.length);
    setOpen(!open);
    setShowModal(!showModal);
  };

  const editGroup = (type, id) => {
    setBrunchBagType(type);
    setBrunchBagId(id);
    setOpen(!open);
    setShowModal(!showModal);
  };

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
    setBrunchBagId(state.data.brunchBag.bags.length);
    actions.updateAction({
      brunchBagData: brunchBag.brunchBagsQuantities,
    });
  }, []);

  return state.data.brunchBagData.large !== 0 &&
    state.data.brunchBagData.small !== 0 ? (
    <>
      <section className='my-8 border-b-4 border-m-yellow pb-8'>
        <AddDateBrunchBag dates={dates} />
        <p className='text-lg'>
          <span className='text-xl font-serif font-black'>Delivery Date</span>:{' '}
          {state.data.brunchBag.deliveryDate
            ? state.data.brunchBag.deliveryDate
            : ''}
        </p>
      </section>
      <section className='pb-4 my-8 border-b-4 border-m-yellow'>
        <p className='text-xl'>
          <span className='text-xl font-serif font-black'>Brunch Bags</span>:
        </p>
        {state.data.brunchBagData.large !== 0 && (
          <>
            <Button
              type={'button'}
              style={{ transition: 'all .15s ease' }}
              text={`Add Large - ${priceLarge}.00`}
              disabled={false}
              name='large'
              onClick={e => addGroup('large')}
              fullWidth={false}
            />

            <p className='text-xl font-serif font-black'>
              Choice of 6 Bagels, 12 Farm Fresh Eggs, and Microgreens
            </p>
          </>
        )}
        {state.data.brunchBagData.small !== 0 && (
          <>
            <Button
              type={'button'}
              style={{ transition: 'all .15s ease' }}
              text={`Add Small - ${priceSmall}.00`}
              disabled={false}
              name='small'
              onClick={e => addGroup('small')}
              fullWidth={false}
            />

            <p className='text-xl font-serif font-black'>
              Choice of 3 Bagels, 6 Farm Fresh Eggs, and Microgreens
            </p>
          </>
        )}
        {state.data.brunchBag.bags.length > 0 &&
          state.data.brunchBag.bags.map(bag => (
            <BrunchBagAddRemove
              show
              bag={bag}
              editGroup={editGroup}
              key={bag.id}
            />
          ))}
      </section>
      <BrunchBagBagelSelectionsModal
        setShowModal={setShowModal}
        showModal={showModal}
        bagelData={bagelData}
        brunchBagType={brunchBagType}
        brunchBagID={brunchBagID}
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
  ) : (
    <section className='my-8 border-t-4 border-m-yellow pb-8'>
      <p className='text-xl font-serif font-black'>Brunch bags sold out !</p>
    </section>
  );
};

export default AddBrunchBag;
