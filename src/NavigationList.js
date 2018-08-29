import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class NavigationList extends Component {
  navigate = (category) => {
    this.props.navigator.push({
      screen: 'TestProj.NavigationList',
      title: 'Back',
      passProps: {
        categories: category.subset
      }
    })
  }

  renderItem = (item) =>  {
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.navigate(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { categories } = this.props;
    return (
      <FlatList
        data={categories}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => this.renderItem(item)}
      />
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
