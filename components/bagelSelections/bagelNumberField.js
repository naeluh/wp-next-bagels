import React from 'react';
import NumberFormat from 'react-number-format';
import { Controller } from 'react-hook-form';
import styles from './bagelForm.module.css';
import updateAction from '../../lib/updateAction';
import { useStateMachine } from 'little-state-machine';

const bagelNumberField = ({ onChange, control, bagel }) => {
  const { state, action } = useStateMachine(updateAction);

  const setChange = data => {
    action();
  };

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
        type='number'
        onChange={data => setChange(data)}
      />
    </div>
  );
};

export default bagelNumberField;
