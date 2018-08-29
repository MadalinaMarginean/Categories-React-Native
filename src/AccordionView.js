import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';


export default class AccordionView extends Component {
  constructor(props) {
    super(props);
  }

  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.name}</Text>
      </View>
    );
  }

  _renderContent(section){
    return (
    <View style={styles.content}>
      <AccordionView categories={section.subset}/>
    </View>
    );
  }

  render() {
    const { categories } = this.props;

    return (
      <Accordion
        sections={categories}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#808080',
    padding: 10,
    marginTop: 5
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
});
