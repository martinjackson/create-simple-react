import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ExampleClass extends Component {

  constructor(props) {
    super(props);
    this.state = { from: "..." };
    this.updateWho = this.updateWho.bind(this);
  }

  updateWho() {
    this.setState({from: "React Class"});
  }

  componentDidMount() {
    setTimeout(() => this.updateWho(), 3000);
  }

  render() {

    const sd = {...this.props.style, background: 'green', color: 'white'};
    const ss = { maxWidth: '50%', fontSize: 'xx-large' }
    return <div style={sd}>
              <span style={ss}>Hello from {this.state.from}</span>
           </div>;

  }
}

export default ExampleClass;