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

const CheckZipCode = ({ checkZip, setCheckZip }) => {
  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelPickupDates: '',
    bagelPickupLocations: '',
  };

  const { handleSubmit, errors, control, setValue, register, setError } =
    useForm({
      defaultValues,
      mode: 'onChange',
    });

  const { state, actions } = useStateMachine({ updateAction });
  const [zip, setZip] = useState('');
  const [zips, setZips] = useState(zipcodes() || []);
  const [showModal, setShowModal] = useState(false);

  const handleDChange = selectedOption => {
    console.log(selectedOption);
    setValue('zip', selectedOption);
    setZip(selectedOption);
  };

  const onSubmit = data => {
    console.log(data);
    console.log(zips.includes(Number(data.zip)));
    if (!zips.includes(Number(data.zip))) {
      setError('zip', {
        type: 'manual',
        message: 'Sorry',
      });
    }
  };

  /* const onSubmit = data => {
    console.log(data);
    actions.updateAction({
      brunchBag: {
        ...state.data.brunchBag,
        address: { zip: data.zip.label },
      },
    });
    // setShowModal(false);
  }; */

  useEffect(() => {
    console.log(errors?.zip);
  }, [errors]);

  useEffect(() => {
    setZips(zipcodes());
    console.log(zips);
  }, []);

  useEffect(() => {
    if (state.data.brunchBag.address.zip) {
      setValue('zip', state.data.brunchBag.address.zip);
      setZip(state.data.brunchBag.address.zip);
    } else {
      setShowModal(true);
    }
  });

  return (
    <Modal
      button={`Edit Zipcode`}
      title={`Zipcode`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideCloseButton={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={`form ${bagelForm}`}>
        <section>
          <input
            ref={register({
              required: true,
              validate: value => {
                return zips.filter(z => {
                  return value === z.value;
                });
              },
            })}
            className='bg-white w-full border-4 border-m-black placeholder-m-black  text-m-black p-4 my-4 block focus:outline-none focus:ring-2 ring-m-yellow'
            placeholder={'Check your zipcode'}
            type='text'
            name='zip'
          />
          {/* <SelectList
            id='Zipcodes'
            label='Check your zipcode'
            handleChange={handleDChange}
            value={zip}
            name='zip'
            className={classes.formControl}
            control={control}
            rules={{
              required: true,
              validate: value => {
                return zipOptions.filter(z => {
                  console.log(value === z.value);
                  return value === z.value;
                });
              },
            }}
            options={zipOptions}
            placeholder={'Check your zipcode'}
          /> */}

          {errors?.zip?.type === 'required' && (
            <p style={{ color: 'red' }}>
              We need to know your zip to see if you are in the delivery area.
            </p>
          )}

          {errors?.zip?.type === 'manual' && (
            <p style={{ color: 'red' }}>pattern</p>
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
};

export default CheckZipCode;
