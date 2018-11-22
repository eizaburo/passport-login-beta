import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Home from './screens/Home';
import Login from './screens/Login';

const createRootNavigator = (logined = false) => {
  return createSwitchNavigator(
    {
      Logined: { screen: Home },
      Logout: { screen: Login }
    },
    {
      initialRouteName: logined ? 'Logined' : 'Logout'
    }
  );
}

export default class App extends React.Component {
  render() {
    const Layout = createAppContainer(createRootNavigator());
    return (
      <Layout />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
