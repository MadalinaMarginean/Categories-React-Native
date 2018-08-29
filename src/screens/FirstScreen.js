import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';

import AccordionView from '../AccordionView';

export default class FirstScreen extends Component {
  state = {
    data: [],
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    fetch('http://192.168.88.124:8080/v1/subcategoriesSecondMethod/1')
      .then(response => response.json())
      .then(data => {this.setState({ data: data.categories })})
  }

  render() {
    return (
      <View style={styles.container}>
        <AccordionView categories={this.state.data}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
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
