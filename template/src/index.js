import React from 'react';
import ReactDOM from 'react-dom';

import ExampleClass from './ExampleClass'
import ExampleHooks from './ExampleHooks'
import RecordView from './RecordView'

import './index.css'

const App = () => <div className='parent'>
    <ExampleClass className='kid' />
    <ExampleHooks className='kid' />
    <RecordView   className='kid' />
  </div>

ReactDOM.render(<App />, document.getElementById('app'));
