import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './addGroupsForm.module.css';
import { Button, FormControl, makeStyles } from '@material-ui/core';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';
import BagelSetAddRemove from './bagelSetAddRemove';
import BagelPickupLocations from './bagelPickupLocations';
import BagelPickupDates from './bagelPickupDates';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
  },
}));

const addGroupsForm = ({ bagelData, pickupLocations }) => {
  const classes = useStyles();
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const { state, action } = useStateMachine(updateAction);
  const [bagelID, setBagelID] = useState(0);
  const [bagelSelections, setBagelSelections] = useState([]);

  const locations = pickupLocations.map(({ node }) => {
    return {
      label: node.location.locationName,
      value: node.location.locationName.toLowerCase().replace(/\s/g, '-'),
      locationData: node.location,
    };
  });

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
    bagelPickupDates: '',
    bagelPickupLocations: '',
  };

  const { handleSubmit, errors, control, register, reset } = useForm({
    defaultValues,
  });

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
    // state.data.bagelSelections = bagelSelections;
    console.log(data);
    action(data);
  };

  const addGroup = type => {
    setBagelID(bagelID + 1);
    router.push(
      `/bagels/add-bagels?bagelSelectionsID=${bagelID}&type=${type}`,
      `/bagels/add-bagels`
    );
  };

  return (
    <FormControl variant='outlined'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form ${styles.bagelForm}`}
      >
        <section>
          <BagelPickupLocations locations={locations} control={control} />
        </section>

        <section>
          <BagelPickupDates
            dates={dates}
            locations={locations}
            control={control}
          />
        </section>

        <Button variant='outlined' type='submit'>
          Ok
        </Button>
      </form>

      <section className={styles.grid}>
        <Button
          type='button'
          name='dozen'
          onClick={e => addGroup('dozen')}
          variant='contained'
        >
          Add Dozen
        </Button>
        <Button
          type='button'
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

      <section>
        {state.data && (
          <pre style={{ textAlign: 'left' }}>
            {JSON.stringify(state.data, null, 2)}
          </pre>
        )}
      </section>
    </FormControl>
  );
};

export default addGroupsForm;
