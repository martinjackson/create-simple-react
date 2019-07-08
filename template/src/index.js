import React from 'react';
import ReactDOM from 'react-dom';

import ExampleClass from './ExampleClass'
import ExampleHooks from './ExampleHooks'
import RecordView from './RecordView'

const AlignStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  flexWrap: 'wrap',
  height: '100%',
}

const kid = {
  maxWidth: '50%',
  height: '49%',
  width: '49%',
  margin: 4,
  border: 'black',
  borderStyle: 'solid',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const App = () => <div style={AlignStyle}>
    <ExampleClass style={kid} />
    <ExampleHooks style={kid} />
    <RecordView style={kid} />
  </div>

ReactDOM.render(<App />, document.getElementById('app'));
