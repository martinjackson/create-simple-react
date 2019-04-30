import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ClassExample extends Component {

  constructor(props) {
    super(props);
    this.state = { from: "..." };
    this.updateWho = this.updateWho.bind(this);
  }

  updateWho() {
    this.setState({from: "React"});
  }

  componentDidMount() {
    setTimeout(() => this.updateWho(), 3000);
  }

  render() {
    const st = {
      width: '100%',
      height: '50%',
      color: 'white',
      background: '#253237',
    }

    return (
      <div style={st}>Hello from {this.state.from}</div>
    );
  }
}

