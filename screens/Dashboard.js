import React, { useState, useContext, useEffect } from "react";
import { BottomNavigation, Text } from 'react-native-paper';
import Inventory from "./Inventory";
import ChangePassword from "./ChangePassword";
import Logout from "./Logout";

function Dashboard(props) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'inventory', title: 'Inventory', icon: 'tshirt-crew' },
    { key: 'changePassword', title: 'ChangePassword', icon: 'onepassword' },
    { key: 'logout', title: 'Logout', icon: 'logout-variant' },
  ]);

  const InventoryRoute = () => <Inventory props={props}/>;

  const ChangePasswordRoute = () => <ChangePassword props={props}/>;
  
  const LogoutRoute = () => <Logout props={props}/>;

  const renderScene = BottomNavigation.SceneMap({
    inventory: InventoryRoute,
    changePassword: ChangePasswordRoute,
    logout: LogoutRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Dashboard;