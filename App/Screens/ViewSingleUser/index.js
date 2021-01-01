import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,Linking,
  TextInput,
  FlatList, Alert,
  StatusBar
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import Color from '../../Component/Colors'
import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'ContactBook.db' });
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      multiNum: '',
      contactNums: [],
      username: '',
      userimage: '',
      usercontact: '',
      userid: ''
    };
  }


  addContact() {
    let myContact = this.state.contactNums
    myContact.push(this.state.multiNum)

    this.setState({ contactNums: myContact })

  }

  componentDidMount() {
    const { user_id, user_name, user_image, user_contact } = this.props.route.params.data
    let newarry = JSON.parse(user_contact)
   // alert(newarry)
    this.setState({ contactNums: newarry, userid: user_id, username: user_name, userimage: user_image, usercontact: user_contact })




  }




  // async SaveDAta() {
  //   alert('hfhfhf')

  // await  db.transaction(function (tx) {
  //     tx.executeSql(
  //       "UPDATE MyContactBook set user_contact=? where user_id=?",
  //       [JSON.stringify(this.state.contactNums), this.state.userid],
  //       (tx, results) => {
  //         console.log("Resultsupdated", results.rowsAffected);
  //         if (results.rowsAffected > 0) {
  //           Alert.alert(
  //             "Success",
  //             "Contact updated",
  //             [
  //               {
  //                 text: "Ok"
  //               }
  //             ],
  //             { cancelable: false }
  //           );
  //         } else {
  //           //  alert("Updation Failed");
  //         }
  //       }
  //     );
  //   });


  // }




  updateUser() {
    console.log(this.state.contactNums);
    console.log(this.state.usercontact);
    console.log(this.state.userimage);

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE MyContactBook set user_contact=?  where user_id=?',
        [JSON.stringify(this.state.contactNums), this.state.userid],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  // onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
        }
      );
    });
  };



  render() {
    const { userid, username, userimage, usercontact } = this.state
   // let nusercontact = this.mul
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" size={25} />
          </TouchableOpacity>

          <Text style={styles.headerTEXT}>{username}</Text>
        </View>

        <Image
          resizeMode="cover"
          style={styles.imageLogo}
          source={userimage ? { uri: userimage } :
            require('../../Component/image/user.png')} />
        <Text style={styles.nameText}>{username}</Text>
        <View style={styles.contactView}>
          <Text style={styles.contatnumbertext}>Contact Numbers</Text>
          <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
            <Text style={styles.addtext}>Add</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.contactView2}>
          <Text>{usercontact}</Text>
          <TouchableOpacity>
            <Feather name="phone-forwarded" size={25} color={'#1def77'} />
          </TouchableOpacity>
        </View> */}

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




        <TouchableOpacity onPress={() => this.props.navigation.navigate('chiledContat', { id: this.state.userid, userimage: userimage })} style={styles.linkedButton}>
          <Text style={{ color: '#FFFFFF' }}>Create Linked Contact</Text>
        </TouchableOpacity>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  headerView: {
    width: responsiveWidth(53),
    marginLeft: responsiveWidth(3),
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
  imageLogo: {
    alignSelf: 'center',
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    marginTop: responsiveHeight(3),
    borderRadius: responsiveWidth(40 / 2),
  },
  nameText: {
    fontSize: responsiveFontSize(3),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  contatnumbertext: {
    fontSize: responsiveFontSize(2.5),
  },
  contactView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addtext: {
    fontSize: responsiveFontSize(2),
    color: '#2c80b9',
  },
  contactView2: {
    alignSelf: 'center',
    width: responsiveWidth(90),
    marginTop: responsiveHeight(3),
    padding: responsiveWidth(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ModalView: {
    //backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Addview: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    borderRadius: responsiveWidth(2),
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
  linkedButton: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: Color.lightJamni,
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(80),
    width: responsiveWidth(60),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  TextInputmodal: {
    width: '90%',
    height: '20%',
    marginBottom: responsiveHeight(2),
    borderBottomWidth: .3,
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