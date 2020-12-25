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
  const { state, action } = useStateMachine(updateAction);
  const [data, setData] = useState(null);
  console.log(state, action);

  const [bagelSelections, setBagelSelections] = useState([
    {
      id: 1,
      bagelSetType: '',
      bagels: [],
    },
  ]);

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

  const onSubmit = data => {
    state.data.bagelSelections.bagels = data;
  };

  return (
    <ThemeProvider theme={theme}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`form ${styles.bagelForm}`}
      >
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
              {JSON.stringify(state.data.bagelSelections, null, 2)}
            </pre>
          )}
        </section>

        {errors.exampleRequired && <span>This field is required</span>}
        <ButtonsResult {...{ data, reset, defaultValues }} />
      </form>
    </ThemeProvider>
  );
}

export default bagelForm;
