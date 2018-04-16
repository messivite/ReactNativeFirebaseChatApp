import React from 'react';
import {
  Platform,
} from 'react-native';
import Home from './components/Home';
import Chat from './components/Chat';
import Login from './components/Login'

import{
  Router,
  Scene
} from 'react-native-router-flux';

export default class App extends React.Component{

  render() {
    return(
      <Router>
      <Scene key='root' style={{paddingTop: Platform.OS === 'ios' ? 64 : 54 }}>
        <Scene key='login' component={Login} title='Giriş Yap'/>
        <Scene key='home' component={Home} title='Anasayfa'/>
        <Scene key='chat' component={Chat} title='Chat'/>
      </Scene>
      </Router>

    );
  }
}
