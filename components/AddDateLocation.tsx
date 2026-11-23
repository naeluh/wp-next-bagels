'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import groupStyles from './addGroupsForm.module.css';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import Modal from './Modal';
import Button from './Button';
import RadioButtons from './RadioButtons';
import styles from './addDateLocation.module.css';
import type { Option, PickupLocation } from '../lib/types';

type LocationDates = PickupLocation['location']['locationDates'];

type Props = {
  locations: (Option & { locationData: PickupLocation['location'] })[];
};

const AddDateLocation = ({ locations }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
  } = useForm({ mode: 'onChange' });

  const { state, actions } = useStateMachine({ actions: { updateAction } });
  const [date, setDate] = useState<Option | '' | never[]>('');
  const [location, setLocation] = useState<Option | ''>('');
  const [dateOptions, setDateOptions] = useState<Option[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLValue, setCurrentLValue] = useState(state.data.location);
  const [currentDValue, setCurrentDValue] = useState(state.data.time);

  const locationOptions = locations.map(location => {
    return {
      label: location.label,
      value: location.value,
    };
  });

  const convertDateFormat = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatDate = (date: string) => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  const dateInPast = (firstDate: Date, secondDate: Date) => {
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }

    return false;
  };

  const mutateDateArray = (dates: LocationDates) => {
    let dateArr: Option[] = [];
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

  const checkDate = (
    location: string,
    dates: { dates: Option[]; location: string }[]
  ) => {
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

  const handleLChange = (selectedOption: Option) => {
    setValue('BagelPickupLocation', selectedOption);
    setLocation(selectedOption);
    setValue('BagelPickupDate', '');
    clearErrors('BagelPickupLocation');
    clearErrors('BagelPickupDate');
    setDate([]);
    setDateOptions(checkDate(selectedOption.value, locationDates));
  };

  const handleDChange = (selectedOption: Option) => {
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
  }, [showModal]);

  useEffect(() => {
    if (dateOptions.length <= 0) {
      setValue('BagelPickupLocation', '');
      setLocation('');
    }
  }, [dateOptions]);

  const onSubmit = (data: FieldValues) => {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form ${groupStyles.bagelForm}`}
      >
        <section className={[styles.radioButtonSection].join(' ')}>
          <RadioButtons
            id='BagelPickupLocation'
            label='Select Pickup Location'
            handleChange={handleLChange}
            radioVal={location}
            name='BagelPickupLocation'
            title={'Select Pickup Location'}
            group={locationOptions}
            errors={errors}
            register={register}
            type={'location'}
            state={state.data.location}
            currentValue={currentLValue}
            setCurrentValue={setCurrentLValue}
          />
          {locationOptions.length === 0 && (
            <b>No pickup locations at this time.</b>
          )}
        </section>
        {date && (
          <section className={[styles.radioButtonSection].join(' ')}>
            <RadioButtons
              id='BagelPickupDate'
              label='Select Date'
              handleChange={handleDChange}
              radioVal={date}
              name='BagelPickupDate'
              title={'Select Pickup Date'}
              group={dateOptions}
              errors={errors}
              register={register}
              type={'time'}
              state={state.data.time}
              currentValue={currentDValue}
              setCurrentValue={setCurrentDValue}
            />
            <b>
              {dateOptions.length === 0
                ? `No Pickup Dates Available, Please select another pickup location.`
                : ''}
            </b>
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
