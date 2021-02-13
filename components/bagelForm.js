import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './bagelForm.module.css';
import { Checkbox, Button } from '@material-ui/core';
import ButtonResult from './buttonResult';
import BagelSelections from './bagelSelections';
import updateAction from '../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

function bagelForm() {
  const dozen = 12;
  const halfDozen = 6;
  const [dates, setDates] = useState([]);
  const [selectedDateOption, setSelectedDateOption] = useState(null);
  const { state, action } = useStateMachine(updateAction);
  const [data, setData] = useState(null);
  const [bagelID, setBagelID] = useState(0);
  const [bagelSelections, setBagelSelections] = useState([
    {
      id: bagelID,
      bagelSetType: '',
      bagels: [],
    },
  ]);

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

  const formatDate = (date: any) => {
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

  const onSubmit = data => {
    console.log(data);
    setData(data);
    action(data);
    setBagelSelections(bagelSelections => [
      ...bagelSelections,
      {
        id: bagelID,
        bagelSetType: type,
        bagels: [],
      },
    ]);
    setBagelID(bagelID + 1);
    console.log(bagelSelections, bagelID);
  };

  useEffect(() => {
    setDates(nextSevenDays(new Date()));
    return () => {};
  }, []);

  const addGroup = type => {
    setBagelSelections(bagelSelections => [
      ...bagelSelections,
      {
        id: bagelID,
        bagelSetType: type,
        bagels: [],
      },
    ]);
    setBagelID(bagelID + 1);
    setData(data);
    action(data);
    console.log(bagelSelections, bagelID);
  };

  return (
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
              idx={bagelSelections.id}
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
      <ButtonResult {...{ data, reset, defaultValues }} />
    </form>
  );
}

export default bagelForm;
