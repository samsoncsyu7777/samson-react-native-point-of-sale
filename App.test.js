import React from 'react';
import renderer from 'react-test-renderer';

import App from "./App";

describe('<App />', () => {
  
  it('has 1 child', async () => {
    const tree = renderer.create(<App />).toJSON();
    done();
    expect(tree.children.length).toBe(1);
  });

  it('App renders without crashing', async () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('App test against snapshot', async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});