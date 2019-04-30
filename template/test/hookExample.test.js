import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import HookExample from '../src/HookExample.js'

describe('HookExample', function () {

  it('should render', function () {
      var tree = TestUtils.renderIntoDocument(<HookExample />);
      expect(tree).not.toBeNull();
  });


});