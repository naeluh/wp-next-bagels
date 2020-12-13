import React from 'react';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import { Controller } from 'react-hook-form';
import styles from './bagelForm.module.css';

const bagelNumberField = ({ onChange, control, bagel }) => {
  return (
    <div className={styles.numberContainer}>
      <label>{bagel.node.bagelInfo.bagelTitle}</label>
      <Controller
        as={NumberFormat}
        thousandSeparator
        name='numberFormat'
        className='input'
        control={control}
        displayType='input'
        customInput={TextField}
        type='number'
        onChange={([, data]) => data}
      />
    </div>
  );
};

export default bagelNumberField;
