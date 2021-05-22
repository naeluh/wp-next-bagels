import React, { useEffect, useState } from 'react';
import Input from './Input';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import styles from './addressForm.module.css';

const AddressForm = ({ handleInputChange }) => {
  const { state, actions } = useStateMachine({ updateAction });

  return state?.data?.brunchBag?.bags.length > 0 ? (
    <>
      <legend className='text-xl font-serif font-black'>
        Brunch Bag Delivery Details:
      </legend>
      <span>
        This order includes brunch bags. We need your address to deliver the
        brunch bag on {state?.data?.brunchBag?.deliveryDate}. Please fill out
        Delivery Details below.
      </span>
      <Input
        placeholder={'Address'}
        type={'text'}
        name={'addressOne'}
        onChange={handleInputChange}
        required
      />
      <Input
        placeholder={'Address Apt or Suite'}
        type={'email'}
        name={'addressTwo'}
        onChange={handleInputChange}
      />
      <Input
        placeholder={'City'}
        type={'text'}
        name={'city'}
        onChange={handleInputChange}
        required
      />
      <Input
        placeholder={'State'}
        type={'text'}
        name={'state'}
        onChange={handleInputChange}
        required
      />
      <Input
        placeholder={'Zip'}
        type={'text'}
        name={'zip'}
        onChange={handleInputChange}
        required
      />
    </>
  ) : (
    <></>
  );
};

export default AddressForm;
