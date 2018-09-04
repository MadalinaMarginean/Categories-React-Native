import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableHighlight } from 'react-native';

import AccordionView from '../AccordionView';
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";

export default class FirstScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      headerToken: ''
    };
  }

  componentDidMount() {
    try {
    AsyncStorage.getItem('id_token')
      .then((value) => this.setState({headerToken: `Bearer ${value}`}))
        .catch((error) => console.log('error', error))
    }
    catch(error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    this.fetchData();
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Promise.all([
        Icon.getImageSource('md-list', 30),
        Icon.getImageSource('md-apps', 30),
        Icon.getImageSource('md-contact', 30),
      ]).then(source => {
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Login',
              screen: 'TestProj.LoginScreen',
              icon: source[2],
              title: 'Login',
            },
          ]
        });
      })
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  fetchData = async () => {
    fetch('http://192.168.88.113:8080/v1/subcategoriesSecondMethod/1',
      {
        headers: {
        'Authorization': `Bearer ${this.state.headerToken}`},
      })
      .then(response => response.json())
      .then(data => {
        this.setState({data: data.categories})
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    console.log("render", this.props);
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this._userLogout} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
        <AccordionView categories={this.state.data}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 16,
    width: 60,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center'
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
