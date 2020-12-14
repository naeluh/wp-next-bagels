import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './bagelForm.module.css';
import RSelect from 'react-select';
import ReactDatePicker from 'react-datepicker';
import NumberFormat from 'react-number-format';
import {
  Checkbox,
  ThemeProvider,
  createMuiTheme,
  Button,
} from '@material-ui/core';
import ButtonsResult from './buttonResult';
import BagelNumberField from './bagelNumberField';
import BagelSelections from './BagelSelections';
import updateAction from '../../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

function bagelForm({ bagelData }) {
  const dozen = 12;
  const halfDozen = 6;
  const [dates, setDates] = useState([]);
  const [selectedDateOption, setSelectedDateOption] = useState(null);

  const [bagelSelections, setBagelSelections] = useState([]);

  const { state, action } = useStateMachine(updateAction);

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

  const theme = createMuiTheme({
    palette: {
      type: 'light',
    },
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
    bagelSelections,
  };

  const { handleSubmit, errors, control, register, reset } = useForm({
    defaultValues,
  });

  const [data, setData] = useState(null);

  const onSubmit = data => {
    console.log(data);
    setData(data);
    action(data);
  };

  useEffect(() => {
    setDates(nextSevenDays(new Date()));
    return () => {};
  }, []);

  const [bagelID, setBagelID] = useState(0);

  const addGroup = type => {
    setBagelID(bagelID + 1);
    setBagelSelections(bagelSelections => [
      ...bagelSelections,
      {
        id: bagelID,
        bagelSetType: type,
        bagels: [],
      },
    ]);
    console.log(bagelSelections, bagelID);
  };

  const getBagelSet = id => {};

  /* const removeGroup = id => {
    console.log(type, bagelSelections);
    if (bagelID === id) {
    }
    setBagelSelections({
      bagelSetId: bagelID,
      bagelSetType: type,
      bagels: [],
    });
  }; */

  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form ${styles.bagelForm}`}
      >
        <section className={styles.grid}>
          <Button onClick={() => addGroup('dozen')} variant='contained'>
            Add Dozen
          </Button>
          <Button onClick={() => addGroup('halfDozen')} variant='contained'>
            Add 1/2 Dozen
          </Button>
        </section>

        <section>
          {bagelSelections &&
            bagelSelections.map(bagelSelection => (
              <BagelSelections
                bagelData={bagelData}
                bagelSetType={bagelSelection.bagelSetType}
                id={bagelSelections.id}
                bagels={bagelSelection.bagels}
                key={`${bagelSelections.id}${bagelSelection.bagelSetType}`}
                control={control}
              />
            ))}
        </section>

        <section>
          {bagelSelections && (
            <pre style={{ textAlign: 'left' }}>
              {JSON.stringify(bagelSelections, null, 2)}
            </pre>
          )}
        </section>

        <section>
          <label>Native Input:</label>
          <input name='Native' className='input' ref={register} />
        </section>

        <section>
          <label>MUI Checkbox</label>
          <Controller
            as={Checkbox}
            name='Checkbox'
            type='checkbox'
            control={control}
          />
        </section>

        <section>
          <label>React Select</label>
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

        {errors.exampleRequired && <span>This field is required</span>}
        <ButtonsResult {...{ data, reset, defaultValues }} />
      </form>
    </ThemeProvider>
  );
}

export default bagelForm;
