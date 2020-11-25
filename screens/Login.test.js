import React from 'react';
import renderer from 'react-test-renderer';
import LoginVO from '../models/VOs/LoginVO';

import Login from "./Login";

describe('<Login />', () => {
  
  it('has 5 children', async () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree.children.length).toBe(5);
  });

  it('App renders without crashing', async () => {
    const rendered = renderer.create(<Login />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('App test against snapshot', async () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('View properties', async () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree.children).toHaveLength(5);
    expect(tree.props.style).toHaveProperty('backgroundColor');
  });

});