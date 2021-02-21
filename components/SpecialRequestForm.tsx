// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React, { useState } from 'react';
import styles from './contactForm.module.css';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';

const SpecialRequestForm = () => {
  const [status, setStatus] = useState('');

  const submitForm = (ev: any) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus('SUCCESS');
      } else {
        setStatus('ERROR');
      }
    };
    xhr.send(data);
  };

  return (
    <form
      onSubmit={submitForm}
      action='https://formspree.io/f/xdopvjlr'
      method='POST'
    >
      <fieldset>
        <legend className='text-xl font-bold tracking-tighter leading-tight md:pr-8 font-serif mb-4 border-bottom pb-4'>
          Special Request Form
        </legend>
        <Input
          placeholder={'Name'}
          type={'text'}
          name={'name'}
          onChange={() => {}}
          required
        />
        <Input
          placeholder={'Email'}
          type={'email'}
          name={'email'}
          onChange={() => {}}
          required
        />
        <Input
          placeholder={'Phone'}
          type={'phone'}
          name={'phone'}
          onChange={() => {}}
          required
        />
        <TextArea
          name='message'
          placeholder='Please type your request here.'
          required
        />
      </fieldset>

      {status === 'SUCCESS' ? (
        <p>Thanks!</p>
      ) : (
        <Button
          type={'submit'}
          text={'Submit'}
          disabled={false}
          onClick={() => {}}
          style={{ transition: 'all .15s ease' }}
        />
      )}
      {status === 'ERROR' && <p>Ooops! There was an error.</p>}
    </form>
  );
};

export default SpecialRequestForm;
