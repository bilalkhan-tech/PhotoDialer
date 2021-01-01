import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,TextInput,Image,StatusBar } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
  import AntDesign from "react-native-vector-icons/AntDesign";
  import Ionicons from "react-native-vector-icons/Ionicons";

  import {openDatabase} from 'react-native-sqlite-storage';
  import Toast from 'react-native-simple-toast';
  import ImagePicker from 'react-native-image-picker';
  const options = {
    title: 'Select Photo',
    TakePhotoButton: 'Take Photo From Camera',
    ChoosePhotoFromLibrary: 'Choose Photo From Library',
  };
  const db = openDatabase({name: 'ContactBook.db'});
  console.disableYellowBox=true
import RNFetchBlob from 'react-native-fetch-blob'
import Color  from '../../Component/Colors';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage:'',
      imagepath:'',
      mobileNum:[],
      username:'',
    }
    this.createContactTable()
  }

  createContactTable = () => {
    try {
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='MyContactBook'",
          [],
          function (tx, res) {
            console.log('item:', res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS MyContactBook', []);
              txn.executeSql(
                'CREATE TABLE IF NOT EXISTS MyContactBook(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20),pid INTEGER, user_contact VARCHAR(20), user_image  VARCHAR(20))',
                [],
                () => alert('Created new table'),
                () => errorCB(),
              );
            }
          },
        );
      });
    } catch (error) {
      alert(error);
    }
  }
  async SaveDAta()
  {  let { username,mobileNum, showImage} = this.state;
   let newnum=JSON.stringify(mobileNum)
  await db.transaction(async function (tx) {
    tx.executeSql(
      'INSERT INTO MyContactBook(user_name, user_contact, user_image) VALUES (?,?,?)',
      [username, newnum, showImage],
      (tx, results) => {
        console.log(JSON.stringify(results));
       
        if (results.rowsAffected > 0) {
          Toast.showWithGravity(
            'Contact Successfully added',
            Toast.SHORT,
            Toast.BOTTOM,
           
          )
          this.props.navigation.navigate('home')
         
          
          console.log('No of sections inserted :' + JSON.stringify(results.rowsAffected));
        } else {
          
          Toast.showWithGravity(
            'Contact not added',
            Toast.SHORT,
            Toast.BOTTOM,
          );
          console.log('Zero sections inserted');
        }
      },
      (err) => {
        console.log('error: ' + JSON.stringify(err));
        return false;
      },
    );
  });
  
  }
     




  _takingPhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
       let newfile="file://"+response.path
        this.setState({showImage:newfile,imagepath: response.uri})

      
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
         <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
    <View style={styles.headerView}>
    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name='arrowleft' size={25} />
          </TouchableOpacity>

    </View>

<View style={styles.imageView}>
<Image
              resizeMode='cover'
              style={styles.imageLogo}
              source={this.state.showImage?{uri:this.state.showImage }:
               
               require('../../Component/image/user.png')
              }
              />
              <TouchableOpacity onPress={()=>this._takingPhoto()} style={styles.browseImage}>
                  <Text style={styles.buttonText}>Browse Image</Text>
              </TouchableOpacity>

</View>
<Text style={styles.contactText}>Contact Information</Text>
       <View style={styles.inputView}>
           <TextInput
           style={styles.TextInput}
           placeholder='Enter Name'
           onChangeText={(text)=>this.setState({username:text})}
           
           />

       </View>
       <View style={styles.inputView}>
           <TextInput
           style={styles.TextInput}
           placeholder='Enter Number'
           keyboardType='number-pad'
           onChangeText={(text)=>{
            let newarry=this.state.mobileNum
            newarry[0]=text 
            this.setState({mobileNum:newarry})}}
           
           />

       </View>
       <TouchableOpacity
     
       
       onPress={()=>this.SaveDAta()} style={[styles.browseImage,{alignSelf: 'center',marginTop: responsiveHeight(5),}]}>
                  <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
             



      </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: Color.white,
  },
  headerView:{
    width:responsiveWidth(90),
    alignSelf: 'center',
    marginTop:responsiveHeight(3)
  },
  imageView:{
    marginTop:responsiveHeight(5),
    alignSelf: 'center',
    width:responsiveWidth(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imageLogo:{
    width:responsiveWidth(30),
    height:responsiveWidth(30),
    borderRadius: responsiveWidth(2),
},
browseImage:{
    width:responsiveWidth(30),
    height:responsiveHeight(5),
    backgroundColor: '#2c80b9',
    justifyContent: 'center',
    alignItems: 'center',
     borderRadius: responsiveWidth(2),
},
buttonText:{
    color:'#FFFFFF'
},
contactText:{
  alignSelf: 'center',
  fontSize:responsiveFontSize(2.5),
  marginVertical: responsiveHeight(4),
},
TextInput:{
  height:responsiveHeight(5),
  alignSelf: 'center',
  width:responsiveWidth(80)
},
inputView:{
  borderRadius: responsiveWidth(2),
  marginVertical: responsiveHeight(1),
  padding:responsiveWidth(1)
}
})