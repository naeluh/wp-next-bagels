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
import processBrunchBags from '../lib/processBrunchBags';
import moment from 'moment';
import CheckZipCode from './CheckZipCode';

const AddBrunchBag = ({
  bagelData,
  pricing,
  brunchBag,
  brunchBagBlackOutDates,
}) => {
  const router = useRouter();
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
  const [showLarge, setShowLarge] = useState(true);
  const [showSmall, setShowSmall] = useState(true);

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

  useEffect(() => {
    setBrunchBagId(state.data.brunchBag.bags.length);
  }, []);

  useEffect(() => {
    const process = async data => {
      actions.updateAction({
        brunchBagData: await processBrunchBags(data, brunchBagBlackOutDates),
      });
    };

    process(brunchBag);
  }, [state.data.brunchBag.bags, brunchBag]);

  useEffect(() => {
    const checkLarge = state?.data?.brunchBagData?.bb?.filter(
      ({ day, getLarge }) =>
        day &&
        moment
          .utc(day)
          .isSame(
            moment.utc(state.data.brunchBag.deliveryDate, 'dddd, MMMM D, YYYY')
          ) &&
        !getLarge
          ? true
          : false
    );

    setShowLarge(checkLarge?.length > 0 ? false : true);

    const checkSmall = state?.data?.brunchBagData?.bb?.filter(
      ({ day, getSmall }) =>
        day &&
        moment
          .utc(day)
          .isSame(
            moment.utc(state.data.brunchBag.deliveryDate, 'dddd, MMMM D, YYYY')
          ) &&
        !getSmall
          ? true
          : false
    );

    setShowSmall(checkSmall?.length > 0 ? false : true);
  }, [state]);

  return (
    <>
      <section className='my-8 border-b-8 border-m-yellow pb-8'>
        <CheckZipCode />
        <p className='text-lg'>
          <span className='text-xl font-serif font-black'>
            Delivery Zipcode
          </span>
          :{' '}
          {state.data.brunchBag.address.zip
            ? state.data.brunchBag.address.zip
            : ''}
        </p>
      </section>

      <section className='my-8 border-b-8 border-m-yellow pb-8'>
        <AddDateBrunchBag dates={state?.data?.brunchBagData?.dates} />
        <p className='text-lg'>
          <span className='text-xl font-serif font-black'>Delivery Date</span>:{' '}
          {state.data.brunchBag.deliveryDate
            ? state.data.brunchBag.deliveryDate
            : ''}
        </p>
      </section>
      <section className='pb-4 my-8 border-b-8 border-m-yellow'>
        <p className='text-xl'>
          <span className='text-xl font-serif font-black'>Brunch Bags</span>:
        </p>

        {showLarge && (
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

        {showSmall && (
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
  );
};

export default AddBrunchBag;
