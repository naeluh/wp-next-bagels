import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './bagelForm.module.css';
import Select from 'react-select';

function bagelForm({ bagelData }) {
  console.log(bagelData);

  const customStyles = useMemo(
    () => ({
      option: (styles, { isSelected, isFocused, isDisabled }) => {
        let backgroundColor = '#FFFFFF';
        let color = '#000000';
        let borderColor = '#C6C6C6';

        if (isSelected) {
          backgroundColor = '#FFFFFF';
          color = '#000000';
          borderColor = '#000000';
        }

        if (isFocused) {
          backgroundColor = '#FFFFFF';
          color = '#000000';
        }

        if (isDisabled) {
          backgroundColor = '#FFFFFF';
          color = '#C6C6C6';
        }

        return {
          ...styles,
          width: '100%',
          opacity: 1,
          border: '1px solid #C6C6C6',
          borderColor,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: '14px',
          backgroundColor,
          color,
          marginTop: 'px',
          '&:active': {
            // Overwrittes the different states of border
            background: '#fff',
          },
        };
      },
      control: styles => {
        return {
          ...styles,
          width: '100%',
          minHeight: 52,
          boxShadow: 'none',
          borderColor: '#5E79FB',
        };
      },
      menu: styles => {
        return {
          ...styles,
          width: '100%',
          paddingTop: 0,
          marginTop: '-1px',
          minHeight: 52,
          boxShadow: 'none',
        };
      },
      menuList: styles => {
        return { ...styles, paddingTop: 0, paddingBottom: 0, minHeight: 52 };
      },
      singleValue: (styles, state) => {
        return { ...styles, marginLeft: '7px' };
      },
      indicatorSeparator: (styles, state) => {
        return { ...styles, border: 'none', backgroundColor: '#fff' };
      },
      indicatorContainer: (styles, state) => {
        return {
          ...styles,
          border: 'none',
          backgroundColor: '#fff',
          flexDirection: 'column',
        };
      },
    }),
    []
  );

  const dozen = 12;
  const halfDozen = 6;
  const [dates, setDates] = useState([]);
  const [selectedDateOption, setSelectedDateOption] = useState(null);
  const [bagelSets, setBagelSets] = useState(0);
  const [bagelSelections, setBagelSelections] = useState({
    bagelSetId: null,
    bagels: [],
  });

  const { register } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      bagelSets,
      dozen: 12,
      halfDozen: 6,
      bagelSelections,
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
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

  const { handleSubmit, errors, control } = useForm();

  const onSubmit = data => console.log(data);

  useEffect(() => {
    setDates(nextSevenDays(new Date()));
    return () => {};
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.bagelForm}>
      <Controller
        as={Select}
        control={control}
        styles={customStyles}
        value={selectedDateOption}
        defaultValue={selectedDateOption}
        onChange={setSelectedDateOption}
        options={dates}
        name='dates'
        ref={register({ required: true })}
        isSearchable={false}
      />
      <input name='example' defaultValue='test' ref={register} />
      <input name='exampleRequired' ref={register({ required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type='submit' />
    </form>
  );
}

export default bagelForm;
