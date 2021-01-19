import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,StatusBar } from 'react-native';
import Color from "../../Component/Colors"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Contacts from 'react-native-contacts'
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
           <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
         <TouchableOpacity style={styles.backButton} onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name='arrowleft' size={25}/>
          </TouchableOpacity>
        <View style={styles.AddView}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('adduser')} style={styles.Addbutton}>
                <Text style={styles.existingContactText}>Add New Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            
            onPress={()=>this.props.navigation.navigate('showAllCobtacts')}
            style={styles.Addbutton}>
                <Text style={styles.existingContactText}>Add Existing Contacts</Text>
            </TouchableOpacity>
            </View>
      </View>
    );
  }
}
const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Color.white,
    },
    AddView:{
        marginTop: responsiveHeight(10),
        width:responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    Addbutton:{
        marginVertical: responsiveHeight(1),
        borderRadius: responsiveWidth(2),
        width:responsiveWidth(90),
        height:responsiveHeight(6),
        borderWidth: .3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    existingContactText:{
        color:Color.iconeColor,
        fontSize:responsiveFontSize(2)
    },
    backButton:{
        marginTop:responsiveHeight(5),
  marginLeft:responsiveWidth(5),
      },
})