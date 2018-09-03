import { Navigation } from 'react-native-navigation';

import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import LoginScreen from './screens/LoginScreen';
import NavigationList from "./NavigationList";

export default function registerScreens() {
  Navigation.registerComponent('TestProj.FirstScreen', () => FirstScreen);
  Navigation.registerComponent('TestProj.SecondScreen', () => SecondScreen);
  Navigation.registerComponent('TestProj.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('TestProj.NavigationList', () => NavigationList);
}
