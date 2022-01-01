import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { bagelForm } from './addGroupsForm.module.css';
import { makeStyles } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import SelectList from './SelectList';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import zipcodes from '../utils/zipcodes';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: '100%',
  },
}));

export default function CheckZipCode() {
  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelPickupDates: '',
    bagelPickupLocations: '',
  };

  const { handleSubmit, errors, setValue, register, setError } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { state, actions } = useStateMachine({ updateAction });
  const [zips, setZips] = useState(zipcodes() || []);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = data => {
    if (!zips.includes(Number(data.zip))) {
      setError('zip', {
        type: 'manual',
        message:
          'Sorry, zipcode is outside of delivery area. Try another zipcode or click here',
      });
    } else {
      actions.updateAction({
        brunchBag: {
          ...state.data.brunchBag,
          address: { ...state.data.brunchBag.address, zip: data.zip },
        },
      });
      setShowModal(false);
    }
  };

  useEffect(() => {
    setZips(zipcodes());
  }, []);

  useEffect(() => {
    if (state.data.brunchBag.address.zip) {
      setValue('zip', state.data.brunchBag.address.zip);
    } else {
      setShowModal(true);
    }
  }, []);

  return (
    <Modal
      button={`Edit Zipcode`}
      title={`Check your zipcode`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideCloseButton={true}
      z={'z-50'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={`form`}>
        <section>
          <input
            ref={register({ required: true })}
            className='bg-white w-full border-8 border-m-black placeholder-m-black  text-m-black p-4 my-4 block focus:outline-none focus:ring-2 ring-m-yellow'
            placeholder={'Check your zipcode'}
            type='tel'
            name='zip'
            maxlength='5'
          />

          {errors?.zip?.type === 'required' && (
            <p className='text-m-red'>
              We need to know your zip to see if you are in the delivery area.
            </p>
          )}

          {errors?.zip?.type === 'manual' && (
            <>
              <p className='text-m-red'>{errors?.zip?.message}</p>
              <Link href='/'>
                <Button
                  type={'button'}
                  style={{ transition: 'all .15s ease' }}
                  text={'Go Back to homepage'}
                  disabled={false}
                  fullWidth
                />
              </Link>
            </>
          )}
        </section>

        <Button
          type={'submit'}
          style={{ transition: 'all .15s ease' }}
          text={'Ok'}
          disabled={false}
          fullWidth
        />
      </form>
    </Modal>
  );
}
