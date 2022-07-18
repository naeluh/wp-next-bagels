import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { bagelForm } from './addGroupsForm.module.css';
import { makeStyles } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import Modal from './Modal';
import Button from './Button';
import RadioButtons from './RadioButtons';
import styles from './addDateLocation.module.css';

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

const AddDateLocation = ({ dates, locations }) => {
  const router = useRouter();
  const classes = useStyles();
  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelPickupDates: '',
    bagelPickupLocations: '',
  };

  const {
    handleSubmit,
    register,
    errors,
    clearErrors,
    control,
    setValue,
    getValues,
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { state, actions } = useStateMachine({ updateAction });
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [dateOptions, setDateOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLValue, setCurrentLValue] = useState(state.data.location);
  const [currentDValue, setCurrentDValue] = useState(state.data.time);

  const locationOptions = locations.map(location => {
    return {
      label: location.label,
      value: location.value,
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

  const dateInPast = (firstDate, secondDate) => {
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }

    return false;
  };

  const mutateDateArray = dates => {
    let dateArr = [];
    let d = new Date();
    let futureDate = new Date(d.setDate(d.getDate() + 2));

    if (!dates) return dateArr;
    dateArr = dates
      .filter(
        ({ locationDate }) =>
          locationDate &&
          !dateInPast(new Date(formatDate(locationDate.toString())), futureDate)
      )
      .map(({ locationDate }) => {
        return {
          value: formatDate(locationDate.toString()),
          label: convertDateFormat(locationDate.toString()),
        };
      });
    return dateArr;
  };

  const locationDates = locations.map(location => {
    return {
      dates: location.locationData.locationDates
        ? mutateDateArray(location.locationData.locationDates)
        : [],
      location: location.value,
    };
  });

  const checkDate = (location, dates) => {
    if (!location) {
      return [];
    }
    let lds = dates.filter(date => {
      return location === date.location;
    })[0].dates;
    if (lds.length > 0) {
      return lds;
    } else {
      return [];
    }
  };

  const handleLChange = selectedOption => {
    setValue('BagelPickupLocation', selectedOption);
    setLocation(selectedOption);
    setValue('BagelPickupDate', '');
    clearErrors('BagelPickupLocation');
    clearErrors('BagelPickupDate');
    setDate([]);
    setDateOptions(checkDate(selectedOption.value, locationDates));
  };

  const handleDChange = selectedOption => {
    const values = getValues();
    if (values.BagelPickupLocation && selectedOption) {
      setValue('BagelPickupDate', selectedOption);
      setDate(selectedOption);
      clearErrors('BagelPickupDate');
    }
  };

  useEffect(() => {
    if (state.data.location && state.data.time) {
      setValue('BagelPickupLocation', state.data.location);
      setValue('BagelPickupDate', state.data.time);
      setLocation(state.data.location);
      setDate(state.data.time);
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    if (!state.data.location && !state.data.time && showModal) {
      // router.push('/');
    }
    console.log(state.data.location, state.data.time, showModal);
  }, [showModal]);

  const onSubmit = data => {
    actions.updateAction({
      location: data.BagelPickupLocation,
      time: data.BagelPickupDate,
      formattedDate: data.BagelPickupDate.label,
      formattedLocation: data.BagelPickupLocation.label,
    });
    setShowModal(false);
  };

  return (
    <Modal
      button={`Edit Location and Date`}
      title={`Location and date`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideCloseButton={!state.data.location && !state.data.time ? true : false}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={`form ${bagelForm}`}>
        <section className={[styles.radioButtonSection].join(' ')}>
          <RadioButtons
            id='BagelPickupLocation'
            label='Select Pickup Location'
            handleChange={handleLChange}
            radioVal={location}
            name='BagelPickupLocation'
            className={classes.formControl}
            control={control}
            rules={{ required: true }}
            title={'Select Pickup Location'}
            group={locationOptions}
            errors={errors}
            register={register}
            defaultValues={defaultValues.bagelPickupLocations}
            type={'location'}
            state={state.data.location}
            currentValue={currentLValue}
            setCurrentValue={setCurrentLValue}
          />
        </section>
        {date && (
          <section className={[styles.radioButtonSection].join(' ')}>
            <RadioButtons
              id='BagelPickupDate'
              label='Select Date'
              handleChange={handleDChange}
              radioVal={date}
              name='BagelPickupDate'
              className={classes.formControl}
              control={control}
              rules={{ required: true }}
              noOptionsMessage={() => 'No dates available'}
              title={'Select Pickup Date'}
              group={dateOptions}
              errors={errors}
              register={register}
              defaultValues={defaultValues.bagelPickupDates}
              type={'time'}
              state={state.data.time}
              currentValue={currentDValue}
              setCurrentValue={setCurrentDValue}
            />
          </section>
        )}

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

export default AddDateLocation;
