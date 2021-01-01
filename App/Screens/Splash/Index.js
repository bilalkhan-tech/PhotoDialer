import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Colors from "../../Component/Colors";
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Index </Text>
      </View>
    )
  }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    }
})