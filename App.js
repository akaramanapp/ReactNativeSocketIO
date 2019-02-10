/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Modal} from 'react-native';
window.navigator.userAgent = 'react-native';
import io from 'socket.io-client/dist/socket.io';


type Props = {};
export default class App extends Component<Props> {
  state = {
    dolarRate: null
  }

  constructor(){
    super();

    const connectionConfig = {
      jsonp: false,
      reconnection: true,
      reconnectionDelay: 100,
      reconnectionAttempts: 100000,
      transports: ['websocket'], // you need to explicitly tell it to use websockets
    };

    socket = io("http://localhost:3000", connectionConfig);

    socket.on('connect', function(){
      console.log('Socket connected!');
    });

    socket.on('update', function (response) {
      this.setState({dolarRate: response.data.dolarRate})
    }.bind(this));
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Dolar Kuru: {this.state.dolarRate}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
