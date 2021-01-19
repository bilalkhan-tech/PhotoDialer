import React, { Component } from 'react';
import { View, Text,Linking,TouchableOpacity ,Image,FlatList,SafeAreaView,TextInput,StyleSheet} from 'react-native';
import  Color  from "../../Component/Colors";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import AntDesign from "react-native-vector-icons/AntDesign";
import {openDatabase} from 'react-native-sqlite-storage';
import { Link } from '@react-navigation/native';
const db = openDatabase({name: 'ContactBook.db'});

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serachResult:'',
      searchResultData:true,
      searchData:[],
      datasource:[]
    }
 this.GetContact();
  }
  GetContact = async () => {
    const that = this;
    await db.transaction(async function (tx) {
      tx.executeSql(
        'Select * from MyContactBook',
        [],
        (tx, results) => {
          let mydata = [];
          if (results.rows.length > 0) {
            console.log('results.rows: ' + JSON.stringify(results.rows));
            for (let i = 0; i < results.rows.length; i++) {
              mydata.push(results.rows.item(i));
            }
           // alert(JSON.stringify(mydata))
            console.log(JSON.stringify(mydata))
            that.setState({datasource: mydata});
          } else {
            console.log('Zero sections inserted');
          }
        },
        (err) => {
          // alert(err);
          console.log('error: ' + JSON.stringify(err));
          return false;
        },
      );
    });
  };  

onSubmitedEdit= async ()=>{
  const that = this

    await db.transaction(async function (tx) {
      tx.executeSql(
        'Select * from MyContactBook where user_name=?',
        [that.state.serachResult],
        (tx, results) => {
          let mydata = [];
          if (results.rows.length > 0) {
            console.log('results.rows: ' + JSON.stringify(results.rows));
            for (let i = 0; i < results.rows.length; i++) {
              mydata.push(results.rows.item(i));
            }
           // alert(JSON.stringify(mydata))
           that.setState({searchResultData:false})
            console.log(JSON.stringify(mydata))
            that.setState({searchData: mydata});
          } else {
            console.log('data not found');
          }
        },
        (err) => {
          // alert(err);
          console.log('error: ' + JSON.stringify(err));
          return false;
        },
      );
    });
 
}





  render() {
    return (
      <SafeAreaView style={styles.container}>
         <View style={styles.headerView}>
        <Text style={styles.searchText}> Search </Text>
      </View>
      <View style={styles.searchView}>
        <AntDesign name='search1' color={Colors.grey} size={25}/>
        <TextInput
        placeholder='Search Contacts'
        autoCapitalize={false}
        autoCorrect={false}
        onChangeText={(text)=>this.setState({serachResult:text})}
        onSubmitEditing={this.onSubmitedEdit}
        style={styles.TextInput}
        />

      </View>


      {this.state.searchResultData?



<View style={styles.footerView}>
  <FlatList
  showsVerticalScrollIndicator={false}
  data={this.state.datasource}
  keyExtractor={item=>item.id}
  renderItem={({item,index})=>{
    return(
      <TouchableOpacity 
      onPress={()=>Linking.openURL(`tel:${item.user_contact}`)}
      key={index} style={styles.searchButton}>
        <Image
        resizeMode='cover'
        source={item.user_image?{uri:item.user_image}:
        require('../../Component/image/user.png')
      }
        style={styles.userImage}
        />
        <Text style={styles.nameText}>{item.user_name}</Text>

      </TouchableOpacity>
    )
  }}
  
  />
</View>:

<View style={styles.footerView}>
  <FlatList
  showsVerticalScrollIndicator={false}
  data={this.state.searchData}
  keyExtractor={item=>item.id}
  renderItem={({item,index})=>{
    return(
      <TouchableOpacity 
      onPress={()=>Linking.openURL(`tel:${item.user_contact}`)}
      key={index} style={styles.searchButton}>
        <Image
        resizeMode='cover'
        source={item.user_image?{uri:item.user_image}:
        require('../../Component/image/user.png')
      }
        style={styles.userImage}
        />
        <Text style={styles.nameText}>{item.user_name}</Text>

      </TouchableOpacity>
    )
  }}
  
  />
</View>
}
      </SafeAreaView>
     
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    alignSelf: 'center',
    backgroundColor:Color.white
  },
  headerView:{
    width:responsiveWidth(100),
    height:responsiveHeight(5),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  searchText:{
    fontSize:responsiveFontSize(2),
    marginTop:responsiveHeight(2),
    fontWeight:'500'
  },
  searchView:{
    alignSelf: 'center',
    width:responsiveWidth(90),
    height:responsiveHeight(6),
    borderRadius:responsiveWidth(2),
    flexDirection: 'row',
    marginTop:responsiveHeight(3),
    overflow:'hidden',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  backgroundColor: '#fff',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.20,
shadowRadius: 1.41,

elevation: 2,
  },
  TextInput:{
    width:responsiveWidth(70)
  },
  footerView:{
    alignSelf: 'center',
    width:responsiveWidth(100),

    marginTop: responsiveHeight(3),
  },
  searchButton:{
    width:responsiveWidth(95),
    padding:responsiveWidth(2),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: .3,
  },
  userImage:{
    width:responsiveWidth(20),
    height:responsiveWidth(20), 
    marginLeft: responsiveWidth(3),
  },
  nameText:{
    marginLeft:responsiveWidth(2),
    fontSize:responsiveFontSize(2),
    fontWeight:'500'

  }

})