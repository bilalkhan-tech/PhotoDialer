import React,{ Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import Splash from "./App/Screens/Splash";
import Home from "./App/Screens/Home"
import Search from "./App/Screens/Search"
import AddUser from "./App/Screens/AddUser";
import addContact from "./App/Screens/AddContact";
import ViewSingleUser from "./App/Screens/ViewSingleUser";
import ChiledContact from "./App/Screens/ChiledContact";
import AllChiledShow from "./App/Screens/AllChiledShow";
import UpdateParentUser from "./App/Screens/UpdateParentUser";
import SingleChiledShow from "./App/Screens/SingleChiledShow";
import ShowAllContacts from "./App/Screens/ShowAllContacts";

const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();

export default myStack=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='home' headerMode='none'>
      {/* <Stack.Screen name='Splash' component={Splash}/> */}
      <Stack.Screen name='adduser' component={AddUser}/> 
      <Stack.Screen name='addcontact' component={addContact}/> 
      <Stack.Screen name='chiledContat' component={ChiledContact}/>
      <Stack.Screen name='updatedParentUser' component={UpdateParentUser}/> 
      <Stack.Screen name='allchiledShow' component={AllChiledShow}/> 
      <Stack.Screen name='singleUserView' component={ViewSingleUser}/> 
      <Stack.Screen name='singleChiledShow' component={SingleChiledShow}/> 
      <Stack.Screen name='showAllCobtacts' component={ShowAllContacts}/> 
      <Stack.Screen name='home' component={tabBar}/> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const tabBar=()=>{
  return(
    <Tab.Navigator
       screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        if (route.name === 'Home') {
          return focused? <Ionicons name='ios-people' size={30}  /> : <Ionicons name='ios-people' size={20}  color={'grey'}/>
           
        } else if (route.name === 'Search') {
          return focused? <AntDesign name='search1' size={30}  />:<AntDesign name='search1' size={20} color={'grey'}/>
        }

       
      },
    })}
    tabBarOptions={{
     
      inactiveTintColor: 'gray',
      showLabel:false
    
      
    }}
    
    
    initialRouteName='Home' headerMode='none'>
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='Search' component={Search}/>

     </Tab.Navigator>
  )
}