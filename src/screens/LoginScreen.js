import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';

import Label from '../utils/Label';
import {Navigation} from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

const STORAGE_KEY = 'id_token';

export default class LoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    }
  }

  changeUsername = (username) => {
    this.setState({username: username});
  }

  changePassword = (password) => {
    this.setState({password: password});
  }

  async _onValueChange(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _userLogin = () => {
    const value = this.state;
    if (value) { // if validation fails, value will be null
      fetch("http://192.168.88.113:3001/sessions/create", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          Alert.alert(
            "Login Success!",
            // [
            //   {text: 'OK', onPress: () => console.log('OK Pressed')},
            // ],
            // { cancelable: false }
          ),
            this._onValueChange(STORAGE_KEY, responseData.id_token);
          Promise.all([
            Icon.getImageSource('md-list', 30),
            Icon.getImageSource('md-apps', 30),
            Icon.getImageSource('md-contact', 30),
          ]).then(source => {
            Navigation.startTabBasedApp({
              tabs: [
                // {
                //   label: 'Login',
                //   screen: 'TestProj.LoginScreen',
                //   icon: source[2],
                //   title: 'Login',
                // },
                {
                  label: 'Accordion',
                  screen: 'TestProj.FirstScreen', // this is a registered name for a screen
                  icon: source[0],
                  title: 'Accordion',
                },
                {
                  label: 'Push',
                  screen: 'TestProj.SecondScreen',
                  icon: source[1],
                  title: 'Push'
                },
              ]
            });
          })
        })
        // .catch((error) => console.log("error", error))
        .done();
    }
  }

  _userSignup = () => {
    const value = this.state;
    if (value) { // if validation fails, value will be null
      fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          this._onValueChange(STORAGE_KEY, responseData.id_token),
            Alert.alert(
              "Signup Success!"
            )
        })
        .done();
    }
  }

  async _userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
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
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Signup/Login</Text>
        </View>
        <View>
          <Label text="Username or Email" />
          <TextInput
            style={styles.textInput}
            value={this.state.username}
            onChangeText={(username) => this.changeUsername(username)}
          />
          <Label text="Password" />
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            value={this.state.password}
            onChangeText={(password) => this.changePassword(password)}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.buttonsContainer}>
            <TouchableHighlight style={styles.button} onPress={this._userSignup} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
         </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 50
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  textInput: {
    height: 45,
    fontSize: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    marginTop: 30
  }
});
