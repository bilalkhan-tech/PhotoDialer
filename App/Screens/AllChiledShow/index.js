import React, { Component } from 'react';
import { View, Text,StyleSheet,Linking,TouchableOpacity,Image,FlatList,StatusBar } from 'react-native';
import Color  from '../../Component/Colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'ContactBook.db'});
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Swipeout from 'react-native-swipeout';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid:'',
      data:[],
      userImage:'',
      username:'',
     
    };
  }

componentDidMount(){
  const{user_id,user_name,user_image}=this.props.route.params.data
this.setState({pid:user_id,userImage:user_image,username:user_name})

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

deleteChiled=()=>{
  return(
    <TouchableOpacity style={{backgroundColor: 'red', width:responsiveWidth(10),height:responsiveHeight(5),justifyContent: 'center',alignItems: 'center',}}>
<Text>Delete</Text>
    </TouchableOpacity>
  )
}

  render() {
  const {pid,userImage,username} =this.state
    return (
      <View style={styles.container}>
        <StatusBar barStyle = 'light-content' translucent backgroundColor='transparent'/>
        <View style={styles.hederView}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
          <AntDesign name='arrowleft' size={25} />
          </TouchableOpacity>
        
        </View>
        <View style={styles.flatView}>

<View style={styles.parentImageView}>
    <Image
          resizeMode={'cover'}
          style={styles.parentImage}
          source={userImage?{uri:userImage}:
        require('../../Component/image/user.png')
        }
          />
          <Text style={styles.usernameText}>{username}</Text>

</View>



<FlatList
showsVerticalScrollIndicator={false}

data={this.state.data}
keyExtractor={id=>id}
renderItem={({item,index})=>{
  return(
<Swipeout right={this.deleteChiled}>
<View key={index} style={styles.flatbutton}>

<Image
      resizeMode={'cover'}
      source={ item.user_image?{uri:item.user_image}:
    require('../../Component/image/user.png')
    }

      style={styles.userimage}
      
      />

      <Text>{item.user_name}</Text>
      <Text>{item.user_relation}</Text>
      <TouchableOpacity>
      <Feather onPress={() => Linking.openURL(`tel:${item.user_contact}`)
                  } name="phone-forwarded" size={25} color={'#1def77'} />
      </TouchableOpacity>
</View>
</Swipeout>
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
    width:responsiveWidth(20),
    height:responsiveWidth(20),
    marginVertical:responsiveHeight(2)
  },
  hederView:{
marginTop:responsiveHeight(3),

    width:responsiveWidth(20),
    flexDirection: 'row',
   
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  parentImage:{
    width:responsiveWidth(30),
    height:responsiveWidth(30),
    borderRadius:responsiveWidth(30/2)
  },
  flatView:{
    
    alignSelf: 'center',
    width:responsiveWidth(90),
    marginTop:responsiveHeight(3)
  },
  parentImageView:{
    width:responsiveWidth(90),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  usernameText:{
    fontSize:responsiveFontSize(2),
    fontWeight:'700',
    textAlign:'center',
    right:responsiveWidth(20)
  },
  flatbutton:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    width:responsiveWidth(100),
    marginTop:responsiveHeight(3)
  }
})