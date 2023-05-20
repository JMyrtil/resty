import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

export const intitalState = {
  data: null,
  requestParams: {},
  loading: false,
  history: []
}

export const reducer = (state = intitalState, action) => {
  switch (action.type) {
    case 'START-REQUEST':
      return {
        ...state,
        loading: true,
        requestParams: action.payload
      };
    case 'FINISH-REQUEST':
      return {
        ...state,
        loading: false,
        data: action.payload,
        history: [...state.history,
        {
          requestParams: { ...state.requestParams },
          data: action.payload
        }
        ],
      }
    case 'CHANGE-HISTORY':
      return {
        ...state,
        ...state.history[action.payload],
      }

    default:
      return state;
  }
};

function App() {

  const [state, dispatch] = useReducer(reducer, intitalState);

  const callApi = (requestParams) => {
    // mock output
    let action = {
      type: 'START-REQUEST',
      payload: requestParams
    }
    dispatch(action);
  }

  const changeHistory = (idx) => {
    let action = {
      type: 'START-REQUEST',
      payload: idx,
    }
    dispatch(action);
  }

  useEffect(() => {
    const getData = async () => {
      if (state.requestParams.method && state.requestParams.url) {
        let response = await axios(state.requestParams)
        const data = response.data;
        let action = {
          type: 'FINISH-REQUEST',
          payload: data,
        }
        dispatch(action);
      }
    }
    getData();
  }, [state.requestParams]);

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <div>Sent data: {state.requestParams.textArea} </div>
      <Form handleApiCall={callApi} />
      <History history={state.history} changeHistory={changeHistory} />
      <Results data={state.data} loading={state.loading} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
