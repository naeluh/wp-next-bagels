import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './bagelForm.module.css';
import RSelect from 'react-select';
import ReactDatePicker from 'react-datepicker';
import NumberFormat from 'react-number-format';
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  ThemeProvider,
  Radio,
  createMuiTheme,
  Slider,
} from '@material-ui/core';
import ButtonsResult from './buttonResult';
import BagelNumberField from './bagelNumberField';

function bagelForm({ bagelData }) {
  console.log(bagelData);

  const dozen = 12;
  const halfDozen = 6;
  const [dates, setDates] = useState([]);
  const [selectedDateOption, setSelectedDateOption] = useState(null);
  const [bagelSets, setBagelSets] = useState(0);
  const [bagelSelections, setBagelSelections] = useState({
    bagelSetId: null,
    bagels: [],
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
    bagelSets,
    dozen: 12,
    halfDozen: 6,
    bagelSelections,
  };

  const { handleSubmit, errors, control, register, reset } = useForm({
    defaultValues,
  });

  const [data, setData] = useState(null);

  const onSubmit = data => console.log(data);

  useEffect(() => {
    setDates(nextSevenDays(new Date()));
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={handleSubmit(data => setData(data))}
        className={`form ${styles.bagelForm}`}
      >
        <section>
          <label>Native Input:</label>
          <input name='Native' className='input' ref={register} />
        </section>

        <section>
          <label>Select Bagels</label>
          {bagelData.map(bagel => (
            <BagelNumberField
              control={control}
              bagel={bagel}
              key={bagel.node.bagelInfo.bagelTitle}
            />
          ))}
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

        <section>
          <label>NumberFormat</label>
          <Controller
            as={NumberFormat}
            thousandSeparator
            name='numberFormat'
            className='input'
            control={control}
            displayType='input'
            type='number'
          />
        </section>

        {errors.exampleRequired && <span>This field is required</span>}
        <ButtonsResult {...{ data, reset, defaultValues }} />
      </form>
    </ThemeProvider>
  );
}

export default bagelForm;
