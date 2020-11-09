// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React, { useState } from 'react';

const contactForm = () => {
  const [status, setStatus] = useState('');

  const submitForm = ev => {
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
      action='https://formspree.io/f/xzbkgnpk'
      method='POST'
    >
      <label>Email:</label>
      <input type='email' name='email' />
      <label>Message:</label>
      <input type='text' name='message' />

      {status === 'SUCCESS' ? <p>Thanks!</p> : <button>Submit</button>}
      {status === 'ERROR' && <p>Ooops! There was an error.</p>}
    </form>
  );
};

export default contactForm;
