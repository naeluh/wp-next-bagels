import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { bagelForm } from './addGroupsForm.module.css';
import { makeStyles } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import SelectList from './SelectList';
import Modal from './Modal';
import Button from './Button';

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
  const lRef = useRef(null);
  const dRef = useRef(null);
  const classes = useStyles();
  const defaultValues = {
    dozen: 12,
    halfDozen: 6,
    bagelPickupDates: '',
    bagelPickupLocations: '',
  };
  const { handleSubmit, errors, control, setValue, getValues } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { state, actions } = useStateMachine({ updateAction });
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [dateOptions, setDateOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const locationDates = locations.map(location => {
    return {
      dates: location.locationData.locationDates
        ? mutateDateArray(location.locationData.locationDates)
        : [],
      location: location.value,
    };
  });

  const checkDate = (location, dates) => {
    let lds = dates.filter(date => location === date.location)[0].dates;
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
    setDate('');
    dRef.current.select.clearValue();
    setDateOptions(checkDate(selectedOption.value, locationDates));
  };

  const handleDChange = selectedOption => {
    const values = getValues();
    if (values.BagelPickupLocation) {
      setValue('BagelPickupDate', selectedOption);
      setDate(selectedOption);
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
      title={`Pickup Location and date`}
      setShowModal={setShowModal}
      showModal={showModal}
      hideCloseButton={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={`form ${bagelForm}`}>
        <section>
          <SelectList
            id='BagelPickupLocation'
            label='Select Location'
            handleChange={handleLChange}
            value={location}
            name='BagelPickupLocation'
            className={classes.formControl}
            control={control}
            rules={{ required: true }}
            options={locationOptions}
            ref={lRef}
            placeholder={'Select Pickup Location'}
          />
          {errors.BagelPickupLocation?.type === 'required' && (
            <p className='text-m-red'>Location is required</p>
          )}
        </section>

        <section>
          <SelectList
            id='BagelPickupDate'
            label='Select Date'
            handleChange={handleDChange}
            value={date}
            name='BagelPickupDate'
            className={classes.formControl}
            control={control}
            rules={{ required: true }}
            options={dateOptions}
            ref={dRef}
            noOptionsMessage={() => 'No dates available'}
            placeholder={'Select Pickup Date'}
          />
          {errors.BagelPickupDate?.type === 'required' && (
            <p className='text-m-red'>Date is required</p>
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

export default AddDateLocation;
