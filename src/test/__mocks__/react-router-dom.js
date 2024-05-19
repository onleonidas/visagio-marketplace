// __mocks__/react-router-dom.js

import React from 'react';

const reactRouterDom = jest.createMockFromModule('react-router-dom');

reactRouterDom.Link = ({ children, ...props }) => {
  return React.createElement('a', props, children);
};

module.exports = reactRouterDom;
