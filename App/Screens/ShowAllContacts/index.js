import React, { Component } from 'react';
import { View, Text, SafeAreaView,FlatList, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
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
            userContacts: [],
            serachResult: ''
        };
    }

componentDidMount(){
    let tempContacts=[]
    Contacts.getAll((err,contact)=>{
        if(err){
            console.log('error==>'+err)
        }
        else{
            contact.map((item,index)=>{
                tempContacts.push(item)

            })
            this.setState({userContacts:tempContacts})
        }
    })
}



    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
                <View style={styles.phoneBookView}>

                    <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name='arrowleft' size={25} />
                    </TouchableOpacity>
                    <Text style={styles.phoneBookText}>PHONE BOOK</Text>
                </View>

                <View style={styles.searchView}>
                    <AntDesign name='search1' color={Colors.grey} size={25} />
                    <TextInput
                        placeholder='Search Contacts'
                        autoCapitalize={false}
                        autoCorrect={false}
                        onChangeText={(text) => this.setState({ serachResult: text })}
                        onSubmitEditing={this.onSubmitedEdit}
                        style={styles.TextInput}
                    />

                </View>
                <View style={styles.flatlistView}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.userContacts}
                    renderItem={({item,index})=>{
                        return(
                            <TouchableOpacity key={idnex} style={styles.userContactsButton}>
<Text>{item.name}</Text>
<Text>{item.number}</Text>
                            </TouchableOpacity>
                        )

                    }}

                    />

                </View>


            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    phoneBookView: {
        width: responsiveWidth(70),
        padding: responsiveWidth(3),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    phoneBookText: {
        fontSize: responsiveFontSize(2),
        fontWeight: '600'
    },
    searchView: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        alignSelf: 'center', marginTop: responsiveHeight(4),
        width: responsiveWidth(90),
        height: responsiveHeight(7)
    },
    TextInput: {
        width: responsiveWidth(70)
    },
    searchView: {
        alignSelf: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(6),
        borderRadius: responsiveWidth(2),
        flexDirection: 'row',
        marginTop: responsiveHeight(3),
        overflow: 'hidden',
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
    flatlistView: {
        width: responsiveWidth(90),
        marginTop: responsiveHeight(4),
        borderWidth: 1,
        alignSelf: 'center',
    },
    userContactsButton:{
        width:responsiveWidth(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
})