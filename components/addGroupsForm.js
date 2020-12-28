import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './addGroupsForm.module.css';
import RSelect from 'react-select';
import { Button } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import BagelSetAddRemove from './bagelSetAddRemove';

const addGroupsForm = ({ bagelData }) => {
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const [selectedDateOption, setSelectedDateOption] = useState(null);
  const { state, action } = useStateMachine(updateAction);
  const [bagelID, setBagelID] = useState(0);
  const [bagelSelections, setBagelSelections] = useState([]);

  const formatDate = date => {
    const d = new Date(date);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  const nextSevenDays = () => {
    const curr = new Date();
    const first = curr.getDate();
    const dateArr = [];

    for (var i = 0; i < 8; i++) {
      let next = new Date(curr.getTime());
      next.setDate(first + i);
      dateArr.push({
        value: formatDate(next.toString()),
        label: formatDate(next.toString()),
      });
    }
    dateArr.shift();
    return dateArr;
  };

  useEffect(() => {
    setDates(nextSevenDays(new Date()));
    if (state.data.bagelSelections) {
      setBagelID(state.data.bagelSelections.length);
      setBagelSelections(state.data.bagelSelections);
    } else {
      state.data.bagelSelections = bagelSelections;
    }
    return () => {};
  }, []);

  const onSubmit = data => {
    state.data.bagelSelections = bagelSelections;
    action(data);

    router.push(
      `/bagels/add-bagels?bagelSelectionsID=${bagelID}`,
      `/bagels/add-bagels`
    );
  };

  const defaultValues = {
    Native: '',
    TextField: '',
    Select: '',
    ReactSelect: { value: 'vanilla', label: 'Vanilla' },
    Checkbox: false,
    switch: false,
    RadioGroup: '',
    numberFormat: 123456789,
    downShift: 'apple',
    dozen: 12,
    halfDozen: 6,
  };

  const { handleSubmit, errors, control, register, reset } = useForm({
    defaultValues,
  });

  const addGroup = type => {
    setBagelID(bagelID + 1);
    setBagelSelections(bagelSelections => [
      ...bagelSelections,
      {
        id: bagelID + 1,
        bagelSetType: type,
        bagels: [],
      },
    ]);
  };

  return (
    <form
      className={`form ${styles.bagelForm}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <label>Select Date</label>
        <Controller
          as={RSelect}
          control={control}
          value={selectedDateOption}
          defaultValue={selectedDateOption}
          onChange={setSelectedDateOption}
          options={dates}
          name='dates'
          for={register({ required: true })}
          isSearchable={false}
        />
      </section>
      <section className={styles.grid}>
        <Button
          type='submit'
          name='dozen'
          onClick={e => addGroup('dozen')}
          variant='contained'
        >
          Add Dozen
        </Button>
        <Button
          type='submit'
          name='halfDozen'
          onClick={e => addGroup('halfDozen')}
          variant='contained'
        >
          Add 1/2 Dozen
        </Button>
      </section>
      <section>
        {state.data && state.data.bagelSelections !== undefined
          ? state.data.bagelSelections.map(bagelSelection => (
              <BagelSetAddRemove
                bagelSelection={bagelSelection}
                key={bagelSelection.id}
              />
            ))
          : `Let's start by adding a dozen or half dozen`}
      </section>
    </form>
  );
};

export default addGroupsForm;
