import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationList from '../NavigationList';

export default class SecondScreen extends Component {
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
    console.log("data", this.state.data);
    return (
      <View style={styles.container}>
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
});
