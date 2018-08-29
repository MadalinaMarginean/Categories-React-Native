import { Navigation } from 'react-native-navigation';

import registerScreens from './src/index';
import Icon from 'react-native-vector-icons/Ionicons';

registerScreens(); // this is where you register all of your app's screens

// start the app
Promise.all([
  Icon.getImageSource('md-list', 30),
  Icon.getImageSource('md-apps', 30),
]).then(source => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Accordion',
        screen: 'TestProj.FirstScreen', // this is a registered name for a screen
        icon: source[0],
        title: 'Screen One'
      },
      {
        label: 'Push',
        screen: 'TestProj.SecondScreen',
        icon: source[1],
        title: 'Screen Two'
      }
    ]
  });
});