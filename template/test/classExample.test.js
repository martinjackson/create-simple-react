import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import ClassExample from '../src/ClassExample.js'

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

describe('ClassExample', function () {

  it('should render', function () {
      var tree = TestUtils.renderIntoDocument(<ClassExample />);
      expect(tree).not.toBeNull();
  });


});