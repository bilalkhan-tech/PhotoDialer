import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,Image,FlatList,StatusBar } from 'react-native';
import Color  from '../../Component/Colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'ContactBook.db'});
import AntDesign from "react-native-vector-icons/AntDesign";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid:'',
      data:[],
      userImage:''
    };
  }

componentDidMount(){

  const{user_id,user_image}=this.props.route.params.data
  //alert(user_id)
this.setState({pid:user_id,userImage:user_image})

this.GetContact()
}


GetContact = async () => {
  const that = this;
   await db.transaction(async function (tx) {
      tx.executeSql(
          'Select * from MyContactBook where pid=?',
          [that.state.pid],
          (tx, results) => {
              let mydata = [];
              if (results.rows.length > 0) {
                  console.log('results.rows: ' + JSON.stringify(results.rows));
                  for (let i = 0; i < results.rows.length; i++) {
                      mydata.push(results.rows.item(i));
                  }
                 // alert(JSON.stringify(mydata))
                  console.log(JSON.stringify(mydata))
                  that.setState({ data: mydata });
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


  render() {
  const {pid,userImage} =this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle = 'light-content' translucent backgroundColor='transparent'/>
        <View style={styles.hederView}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
          <AntDesign name='arrowleft' size={25} />
          </TouchableOpacity>
          <Image
          resizeMode={'cover'}
          style={styles.parentImage}
          source={userImage?{uri:userImage}:
        require('../../Component/image/user.png')
        }
          />
        </View>
        <View style={styles.flatView}>

<FlatList

numColumns={2}
data={this.state.data}
keyExtractor={id=>id}
renderItem={({item,index})=>{
  return(
    <TouchableOpacity 
    onPress={()=>this.props.navigation.navigate('singleChiledShow',{data:item})}
    key={index} style={styles.ImageButton}>
      <Image
      resizeMode={'cover'}
      source={{uri:item.user_image}}
      style={styles.userimage}
      
      />

    </TouchableOpacity>
  )
}}
/>

        </View>

      </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Color.white,
  },
  userimage:{
    width:responsiveWidth(40),
    height:responsiveWidth(40),
    marginVertical:responsiveHeight(2)
  },
  hederView:{
marginTop:responsiveHeight(3),
marginLeft:responsiveWidth(4),
    width:responsiveWidth(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  parentImage:{
    width:responsiveWidth(10),
    height:responsiveWidth(10),
    borderRadius:responsiveWidth(10/2)
  },
  flatView:{
    
    alignSelf: 'center',
    width:responsiveWidth(90),
    marginTop:responsiveHeight(3)
  }
})