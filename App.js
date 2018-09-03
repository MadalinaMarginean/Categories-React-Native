import { Navigation } from 'react-native-navigation';

import registerScreens from './src/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from "react-native";

registerScreens(); // this is where you register all of your app's screens

// start the app
Promise.all([
  Icon.getImageSource('md-list', 30),
  Icon.getImageSource('md-apps', 30),
  Icon.getImageSource('md-contact', 30),
]).then(source => {
  try {
    AsyncStorage.getItem('id_token')
      .then((value) => {
        console.log("id_tokennnnnn", value);
        if (value) {
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
        }
        else {
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
        }
      })
      .catch((error) => console.log('error', error))
  }
  catch(error) {
    console.log('AsyncStorage error: ' + error.message);
  }
});
