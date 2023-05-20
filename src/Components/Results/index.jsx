import React from 'react';
import JSONPretty from 'react-json-pretty';
import './Results.scss';

function Results(props) {
    return (
      <section>
        {props.loading 
        ? <div>Loading</div>
        : <pre>{props.data ? <JSONPretty data={props.data}/> : null}</pre>}
      </section>
    );
  }

export default Results;
