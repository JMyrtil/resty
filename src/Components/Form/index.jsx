import  React, { useState } from 'react';

import './Form.scss';

function Form(props) {

  const [url, setUrl] = useState('')
  const [textArea, setTextArea] = useState('')
  const [method, setMethod] = useState('GET')

  const handleClick = e => {

    setMethod(e.target.innerText)

    if (method === 'POST' || method === 'PUT') {

    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method: 'methood',
      url: url,
      textArea: textArea,
    };
    props.handleApiCall(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' onChange={(e) => setUrl(e.target.value)} />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span data-testid="get" id="get" onClick={handleClick} style={{ backgroundColor: method === 'GET' ? 'gray' : 'white' }}>GET</span>
          <span data-testid="post" id="post" onClick={handleClick} style={{ backgroundColor: method === 'POST' ? 'gray' : 'white' }}>POST</span>
          <span data-testid="put" id="put" onClick={handleClick} style={{ backgroundColor: method === 'PUT' ? 'gray' : 'white' }}>PUT</span>
          <span data-testid="delete" id="delete" onClick={handleClick} style={{ backgroundColor: method === 'DELETE' ? 'gray' : 'white' }}>DELETE</span>
        </label>
        {method === "POST" && <textarea onChange={(e) => setTextArea(e.target.value)} />}
        {method === "PUT" && <textarea onChange={(e) => setTextArea(e.target.value)} />}
      </form>
    </>
  );
}

export default Form;
