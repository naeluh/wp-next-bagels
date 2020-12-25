import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './addGroupsForm.module.css';
import RSelect from 'react-select';
import ReactDatePicker from 'react-datepicker';
import NumberFormat from 'react-number-format';
import {
  Checkbox,
  ThemeProvider,
  createMuiTheme,
  Button,
} from '@material-ui/core';
import ButtonsResult from '../bagelForm/buttonResult';
import BagelNumberField from '../bagelSelections/bagelNumberField';
import BagelSelections from '../bagelSelections';
import updateAction from '../../lib/updateAction';
import { useStateMachine } from 'little-state-machine';
import { useRouter } from 'next/router';

const addGroupsForm = ({ bagelData }) => {
  const router = useRouter();
  const [dates, setDates] = useState([]);
  const [selectedDateOption, setSelectedDateOption] = useState(null);
  const { state, action } = useStateMachine(updateAction);
  const [bagelID, setBagelID] = useState(0);
  const [bagelSetType, setBagelSetType] = useState('');
  const [bagelSelections, setBagelSelections] = useState([
    {
      id: bagelID,
      bagelSetType: '',
      bagels: [],
    },
  ]);

  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
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
    return () => {};
  }, []);

  const onSubmit = data => {
    console.log(data);
    action(data);
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
    console.log(type);
    setBagelSetType(type);
    setBagelSelections(bagelSelections => [
      ...bagelSelections,
      {
        id: bagelID,
        bagelSetType: bagelSetType,
        bagels: [],
      },
    ]);
    setBagelID(bagelID + 1);
    router.push({
      pathname: '/bagels/add-bagels',
    });
    state.data.bagelSelections = bagelSelections[0];
    state.data.bagelSelections.bagelSetType = type;
    console.log(bagelSelections, bagelID, bagelSetType);
  };

  return (
    <ThemeProvider theme={theme}>
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
            onClick={e => {
              addGroup('dozen');
            }}
            variant='contained'
          >
            Add Dozen
          </Button>
          <Button
            type='submit'
            name='halfDozen'
            onClick={e => {
              addGroup('halfDozen');
            }}
            variant='contained'
          >
            Add 1/2 Dozen
          </Button>
        </section>
      </form>
    </ThemeProvider>
  );
};

export default addGroupsForm;
