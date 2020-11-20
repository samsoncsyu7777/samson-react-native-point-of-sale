import React from 'react';
import renderer from 'react-test-renderer';

import Inventory from "./Inventory";

describe('<Inventory />', () => {
  it('has 3 children', async () => {
    const tree = renderer.create(<Inventory />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('App renders without crashing', async () => {
    const rendered = renderer.create(<Inventory />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('App test against snapshot', async () => {
    const tree = renderer.create(<Inventory />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('View properties', async () => {
    const tree = renderer.create(<Inventory />).toJSON();
    expect(tree.type).toBe('View');
    expect(tree.props).toHaveProperty('style');
  });

  test('Inventory', async () => {
    expect(Inventory).toHaveProperty('displayName');
  });
    
});