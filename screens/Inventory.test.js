import React from 'react';
import {render} from 'react-dom';
import renderer from 'react-test-renderer';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";
import theme from "../Theme";
import Icon from 'react-native-vector-icons/EvilIcons';

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
    /*
  test('given empty GroceryShoppingList, user can add an item to it', () => {
    const { getByPlaceholder, getByText, getAllByText, getByLabel, getByName } = render(
      <Inventory/>
    );
  
    fireEvent.changeText(
      getByLabel('UPC'),
      'banana'
    );
    fireEvent.press(getByName('arrow-right'));
  
    const bananaElements = getAllByText('banana');
    expect(bananaElements).toHaveLength(1); // expect 'banana' to be on the list
  });*/

});