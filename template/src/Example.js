import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Example extends React.Component {
  render() {
    const st = {
      width: '100%',
      height: '100%',
      color: 'white',
      background: '#253237',
    }

    return (
      <div style={st}>Hello</div>
    );
  }
}
