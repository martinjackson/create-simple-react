import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import ExampleHooks from '../src/ExampleHooks.js'

/*
https://stackoverflow.com/questions/36682241/testing-functional-components-with-renderintodocument

Since function components don't have an instance associated with them, you can't use them
directly with render or renderIntoDocument. Instead you will want to wrap your function components
in a wrapper component that uses createClass or extends React.Component.

-- monastic-panic https://stackoverflow.com/users/2108893/monastic-panic
*/

class Wrapper extends React.Component {
  render() {
    return this.props.children
  }
}

describe('ExampleHooks', function () {

  it('should render', function () {
      var tree = TestUtils.renderIntoDocument(<Wrapper><ExampleHooks /></Wrapper>);
      expect(tree).not.toBeNull();
  });


});