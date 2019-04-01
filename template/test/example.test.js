import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Example from '../src/Example.js'

function findReactById(tree, id) {
  return TestUtils.findAllInRenderedTree(tree, function(inst) {
    return TestUtils.isDOMComponent(inst) && inst.id === id;
  });
}

function findDomById(tree, id) {
  const Component = findReactById(tree, id)
  var domNode = ReactDom.findDOMNode(Component[0]);
  return domNode
}

describe('Example', function () {

  it('should render', function () {
      var tree = TestUtils.renderIntoDocument(<Example />);
      expect(tree).not.toBeNull();
  });


});