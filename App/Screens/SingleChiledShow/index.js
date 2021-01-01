import React, { Component } from 'react';
import { View,StyleSheet, Text,TouchableOpacity,Image,StatusBar } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Color from "../../Component/Colors"
import AntDesign from 'react-native-vector-icons/AntDesign';

import Feather from 'react-native-vector-icons/Feather';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username:'',
        userimage:'',
        usercontact:''
    };
  }
  componentDidMount(){
   
     const {user_image,user_contact,user_name}=this.props.route.params.data
     this.setState({username:user_name,userimage:user_image,usercontact:user_contact})
   //alert(this.props.route.params.data.user_contact)

  }


  render() {
      const {username,userimage,usercontact}=this.state
     // alert(usercontact)
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='transparent' barStyle = 'light-content' translucent/>
          <View style={styles.headerView}>
            <TouchableOpacity  onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} />
            </TouchableOpacity>

            <Text style={styles.headerTEXT}>{username}</Text>
            </View>
            <View style={styles.imageView}>
<Image
style={styles.userimagelogo}
resizeMode='cover'
source={userimage?{uri:userimage}:
require('../../Component/image/user.png')}

/>
<Text style={styles.usernameText}>{username}</Text>


<View style={styles.conatctView}>
<Text style={[styles.usernameText,{fontSize:responsiveFontSize(2.5)}]}>Contact Informtion</Text>
<TouchableOpacity>
      <Text style={styles.addText}>Add</Text>
</TouchableOpacity>
  

</View>
<View style={[styles.conatctView,{width:responsiveWidth(90)}]}>
<Text style={[styles.usernameText,{fontSize:responsiveFontSize(2.5)}]}>{usercontact}</Text>
<TouchableOpacity>
     <Feather name='phone-forwarded' size={25} color={Color.phoneColor}/>
</TouchableOpacity>
  

</View>

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
    headerView: {
        width: responsiveWidth(53),
        marginLeft:responsiveWidth(3),
        height: responsiveHeight(5),
       // alignSelf: 'center',
        marginTop: responsiveHeight(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerTEXT: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
      },
      imageView:{
          width:responsiveWidth(100),
          alignSelf: 'center',
          marginTop:responsiveHeight(5)
      },
      userimagelogo:{
          width:responsiveWidth(40),
          height:responsiveWidth(40),
          alignSelf: 'center',
          borderRadius:responsiveWidth(40/2)
      },
      usernameText:{
          fontSize:responsiveFontSize(3),
          alignSelf: 'center',
          marginTop: responsiveHeight(2),
      },
      conatctView:{
          width:responsiveWidth(90),
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
      },
      addText:{
          fontSize:responsiveFontSize(2),
          color:Color.lightJamni


      }
})