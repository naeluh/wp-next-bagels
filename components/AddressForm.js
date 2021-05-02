import React, { useEffect, useState } from 'react';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import styles from './contactForm.module.css';

const AddressForm = () => {
  const { state, actions } = useStateMachine({ updateAction });

  return (
    <>
      <fieldset>
        <legend className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 border-bottom pb-4'>
          Delivery Address
        </legend>
        <Input
          placeholder={'Address'}
          type={'text'}
          name={'addressOne'}
          onChange={() => {}}
          required
        />
        <Input
          placeholder={'Address Apt or Suite'}
          type={'email'}
          name={'addressTwo'}
          onChange={() => {}}
        />
        <Input
          placeholder={'City'}
          type={'text'}
          name={'city'}
          onChange={() => {}}
          required
        />
        <Input
          placeholder={'State'}
          type={'text'}
          name={'state'}
          onChange={() => {}}
          required
        />
        <Input
          placeholder={'Zip'}
          type={'text'}
          name={'zip'}
          onChange={() => {}}
          required
        />
      </fieldset>

      {status === 'SUCCESS' ? (
        <p>Thanks! We'll be in touch soon!</p>
      ) : (
        <Button
          type={'submit'}
          text={'Submit'}
          disabled={false}
          onClick={() => {}}
          style={{ transition: 'all .15s ease' }}
          fullWidth={false}
        />
      )}
      {status === 'ERROR' && <p>Ooops! There was an error.</p>}
    </>
  );
};

export default AddressForm;
