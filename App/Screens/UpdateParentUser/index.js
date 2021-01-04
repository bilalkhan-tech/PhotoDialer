import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, StatusBar } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
const db = openDatabase({ name: 'ContactBook.db' })
import Color from "../../Component/Colors"
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
const options = {
  title: 'Select Photo',
  TakePhotoButton: 'Take Photo From Camera',
  ChoosePhotoFromLibrary: 'Choose Photo From Library',
};
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      username: '',
      usercontact: '',
      userimage: '',
      showImage: '',
      imagepath: '',
      mobileNum: '',
      username2: '',

    };
  }

  componentDidMount() {
    const { user_id, user_name, user_image, user_contact } = this.props.route.params.data
    this.setState({
      userid: user_id,
      username: user_name,
      usercontact: user_contact,
      userimage: user_image
    })


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
        let newfile = "file://" + response.path
        this.setState({ userimage: newfile, imagepath: response.uri })


      }
    });
  }


  updateUser() {
    console.log(this.state.username);
    console.log(this.state.usercontact);
    console.log(this.state.userimage);

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE MyContactBook set user_name=?, user_contact=? , user_image=? where user_id=?',
        [this.state.username, this.state.usercontact, this.state.userimage, this.state.userid],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Toast.showWithGravity(
              'Contact Successfully Updated',
              Toast.SHORT,
              Toast.BOTTOM,
             
            )
            this.props.navigation.navigate('home')
          } else alert('Updation Failed');
        }
      );
    });
  };










  render() {

    const { showImage, username, usercontact, userimage } = this.state
    console.log(showImage)
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <AntDesign name='arrowleft' size={25} />
          </TouchableOpacity>

        </View>
        <View style={styles.imageView}>
          <Image
            resizeMode='cover'
            style={styles.imageLogo}
            source={this.state.userimage ? { uri: this.state.userimage } :

             
                require('../../Component/image/user.png')
            }
          />
          <TouchableOpacity onPress={() => this._takingPhoto()} style={styles.browseImage}>
            <Text style={styles.buttonText}>Browse Image</Text>
          </TouchableOpacity>

        </View>
        <Text style={styles.contactText}>Updated Information</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={username}
            onChangeText={(username) => this.setState({ username })}

          />

        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder={usercontact}
            keyboardType='number-pad'
            onChangeText={(usercontact) => this.setState({ usercontact })}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.updateUser()} style={[styles.browseImage, { alignSelf: 'center', marginTop: responsiveHeight(5), }]}>
          <Text style={styles.buttonText}>Update Contact</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  headerView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: responsiveHeight(3)
  },
  imageView: {
    marginTop: responsiveHeight(5),
    alignSelf: 'center',
    width: responsiveWidth(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imageLogo: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(2),
  },
  browseImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(5),
    backgroundColor: '#2c80b9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
  },
  buttonText: {
    color: '#FFFFFF'
  },
  contactText: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.5),
    marginVertical: responsiveHeight(4),
  },
  TextInput: {
    height: responsiveHeight(5),
    alignSelf: 'center',
    width: responsiveWidth(80)
  },
  inputView: {
    borderRadius: responsiveWidth(2),
    marginVertical: responsiveHeight(1),
    padding: responsiveWidth(1)
  }


})