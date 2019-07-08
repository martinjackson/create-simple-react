import React from 'react';
import ReactDOM from 'react-dom';

import Example_w_class from './Example_w_class'
import Example_w_hooks from './Example_w_hooks'
import Form_w_hooks from './Form_w_hooks'

const App = () => <div>
    <ClassExample_w_class />
    <ClassExample_w_hooks />
    <Form_w_hooks />
  </div>
ReactDOM.render(<App />, document.getElementById('app'));
