import React from 'react';
import DataActions from '@main/__data__/actions/main';

const loadData = async () => {
  return DataActions();
};

const sum = (a, b) => a + b;

export { sum };

export default () => (<h1>Hello, world!</h1>);