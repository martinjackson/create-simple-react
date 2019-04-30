import React from 'react';
import ReactDOM from 'react-dom';

import ClassExample from './ClassExample'
import HookExample from './HookExample'

const App = () => <div><ClassExample /><HookExample /></div>
ReactDOM.render(<App />, document.getElementById('app'));
