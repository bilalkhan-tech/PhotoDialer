import React, { Component } from 'react';
import { View,StyleSheet,TextInput,FlatList, Text,TouchableOpacity,Image,StatusBar } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Color from "../../Component/Colors"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username:'',
        userimage:'',
        usercontact:'',
        isVisible:false,
        contactNums: [],
    };
  }
  componentDidMount(){
   
     const {user_image,user_contact,user_name}=this.props.route.params.data
     this.setState({username:user_name,userimage:user_image,usercontact:user_contact})
   

  }

  componentDidMount() {
    const { user_id, user_name, user_image, user_contact } = this.props.route.params.data
    let newarry = JSON.parse(user_contact)
   // alert(newarry)
    this.setState({ contactNums: newarry, userid: user_id, username: user_name, userimage: user_image, usercontact: user_contact })




  }

  updateUser() {
    // console.log(this.state.contactNums);
    // console.log(this.state.usercontact);
    // console.log(this.state.userimage);

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE MyContactBook set user_contact=?  where user_id=?',
        [JSON.stringify(this.state.contactNums), this.state.userid],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Toast.showWithGravity(
              'Contacts Successfully Updated',
              Toast.SHORT,
              Toast.BOTTOM,
             
            )
          
          } else alert('Updation Failed');
        }
      );
    });
  };









  render() {
      const {username,userimage,usercontact}=this.state 
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
<TouchableOpacity onPress={()=>{this.setState({isVisible:true})}}>
      <Text style={styles.addText}>Add</Text>
</TouchableOpacity>
  

</View>
<View style={[styles.conatctView,{width:responsiveWidth(90)}]}>
<Text style={[styles.usernameText,{fontSize:responsiveFontSize(2.5)}]}>{usercontact}</Text>
<TouchableOpacity>
     <Feather name='phone-forwarded' size={25} color={Color.phoneColor}/>
</TouchableOpacity>
  

</View>
<View style={styles.ContactFLatlist}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.contactNums}
            keyExtractor={item => item}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity key={index} style={styles.contctnumView}>
                  <Text>{item}</Text>
                  <Feather onPress={() => Linking.openURL(`tel:${item}`)
                  } name="phone-forwarded" size={25} color={'#1def77'} />

                </TouchableOpacity>
              )
            }}


          />
        </View>


            </View>




            <View style={styles.ModalView}>
          <Modal isVisible={this.state.isVisible}>
            <View style={styles.cardView}>
              <TextInput
                style={styles.TextInputmodal}
                keyboardType='number-pad'
                placeholder='Enter Conatct Number'
                onChangeText={text => this.setState({ multiNum: text })}
              />
              <TouchableOpacity onPress={() => this.addContact()} style={[styles.modalButton, { backgroundColor: '#1def77', }]}>
                <Text style={styles.Buttontext}>ADD</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.updateUser()
                this.setState({ isVisible: false })
              }} style={[styles.modalButton, { backgroundColor: '#2c80b9', }]}>
                <Text style={styles.Buttontext}>DONE</Text>
              </TouchableOpacity>


            </View>
          </Modal>
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


      },
      ModalView: {
        //backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardView: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
    
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: responsiveWidth(80),
        height: responsiveHeight(40),
        borderRadius: responsiveWidth(2)
    
      },
      modalButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: '90%',
        height: '15%',
        marginVertical: '2%',
        backgroundColor: 'red',
        borderRadius: responsiveWidth(2)
      },
      Buttontext: {
        fontSize: responsiveFontSize(2),
        color: Colors.white
      },
      TextInputmodal: {
        width: '90%',
        height: '20%',
        marginBottom: responsiveHeight(2),
        borderBottomWidth: .3,
      },
      ContactFLatlist: {
        width: responsiveWidth(100),
        alignSelf: 'center',
      },
      contctnumView: {
        width: responsiveWidth(90),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
      }
})