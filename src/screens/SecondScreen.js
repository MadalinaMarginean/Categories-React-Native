import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage, TouchableHighlight } from 'react-native';
import NavigationList from '../NavigationList';
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";

export default class SecondScreen extends Component {
  state = {
    data: [],
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    fetch('http://192.168.88.113:8080/v1/subcategoriesSecondMethod/1')
      .then(response => response.json())
      .then(data => {this.setState({ data: data.categories })})
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

  render() {
    console.log("navigator second", this.props.navigator);
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this._userLogout} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableHighlight>
        <NavigationList categories={this.state.data} navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
});
