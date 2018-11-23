import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { isLogined } from './auth.js';

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

  state = {
    logined: false,
    checkLogined: false,
    access_token: '',
  }

  componentDidMount() {
    isLogined()
      .then(res => {
        this.setState({
          logined: res.logined,
          checkLogined: true,
        });
        // console.log(res.access_token);
      })
      .catch(error => console.log(error));
  }

  render() {
    const { checkLogined, logined } = this.state;

    if (!checkLogined) { return null; }

    const Layout = createAppContainer(createRootNavigator(logined));

    return (
      <Layout />
    );
  }
}
