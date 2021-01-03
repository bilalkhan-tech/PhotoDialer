import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, StatusBar, TouchableHighlight, FlatList, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { openDatabase } from 'react-native-sqlite-storage';
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";

const db = openDatabase({ name: 'ContactBook.db' })
import Color from "../../Component/Colors"
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';
export default class index extends Component {

    // textposition={x:0,y:0}

    constructor(props) {
        super(props);
        // this.position.addListener(latestState=>{
        //     this.textposition=latestState
        // }),
        this.state = {
            datasource: [],
            visible: false,
            width:150,
            height:150,
            columns:2,
            modalVisible: false,
            small: {
                width: responsiveWidth(20),
                height: responsiveWidth(20),
                numColumns: 3

            },
            large: {
                width: responsiveWidth(55),
                height: responsiveWidth(55),
                numColumns: 1
            },
            medium: {
                width: responsiveWidth(30),
                height: responsiveWidth(30),
                numColumns: 2

            }

        }
        this.GetContact()
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
                            console.log(results.rows.item(i).pid)
                            if (!results.rows.item(i).pid) {
                                mydata.push(results.rows.item(i));
                            }
                        }
                        console.log(JSON.stringify(mydata))
                        that.setState({ datasource: mydata });
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


    async deleteUser(id) {
        await db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM  MyContactBook where user_id=?',
                [id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'User deleted successfully',
                            [
                                {
                                    text: 'Ok',
                                    // onPress: () => navigation.navigate('HomeScreen'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Please insert a valid User Id');
                    }
                }
            );
        });
    };

    setSIze() {
        alert(";;;;;")
    }




    // position=new Animated.ValueXY();
    // panResponder=PanResponder.create({
    //     onStartShouldSetPanResponder:()=>true,
    //     onPanResponderMove:(e,gestureState)=>{
    //         const newposition={x:gestureState.dx,y:gestureState.dy};
    //     this.position.setValue(newposition)
    //     },
    //     onPanResponderGrant:()=>{
    //         this.position.setOffset({x:this.textposition.x,y:this.textposition.y});
    //         this.position.setValue({x:0,y:0})
    //     },
    //     onPanResponderEnd:()=>{
    //         this.position.flattenOffset();
    //     }


    // })




    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setState({height:250,width:250,columns:1})
1
                                }}
                            >
                                <Text style={styles.textStyle}>Large</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.modalView}>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setState({height:100,width:100,columns:3})
                                }}
                            >
                                <Text style={styles.textStyle}>Small</Text>
                            </TouchableHighlight>
                        </View> 
                        <View style={styles.modalView}>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setState({height:150,width:150,columns:2})
                                }}
                            >
                                <Text style={styles.textStyle}>Medium</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <StatusBar backgroundColor='transparent' barStyle='light-content' translucent />
                <View style={styles.headerView}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('addcontact')}>
                        <AntDesign name="plus" size={25} color={Color.iconeColor} />
                    </TouchableOpacity>

                    <Text style={styles.headerTEXT}>Photo Dialer</Text>
                    <View style={styles.iconView}>
                        <TouchableOpacity onPress={() => this.setState({ visible: !this.state.visible })}>
                            <Feather name="edit" size={25} color={Color.iconeColor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }}>

                            <Ionicons name="settings-sharp" size={25} color={Color.iconeColor} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.flatlistView}>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        numColumns = {this.state.columns}
                        key={this.state.columns}
                                                data={this.state.datasource}
                        keyExtractor={item => item}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    // style={[this.position.getLayout()]}
                                    // {...this.panResponder.panHandlers}

                                    onLongPress={() => this.props.navigation.navigate('allchiledShow', { data: item })}
                                    onPress={() => { this.props.navigation.navigate('singleUserView', { data: item }) }}

                                    key={index}
                                    style={[styles.Imagebutton,{width:this.state.width,height:this.state.height}]}>
                                    {this.state.visible ?
                                        <View style={styles.iconeView2}>
                                            <TouchableOpacity onPress={() => Alert.alert('Alert', 'Are you sure you want to delete?',
                                                [
                                                    {
                                                        text: "Cancel",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    { text: "OK", onPress: () => this.deleteUser(item.user_id) }
                                                ],
                                                { cancelable: false }


                                            )}>
                                                <EvilIcons name='close-o' size={30} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('updatedParentUser', {
                                                data: item
                                            })}>
                                                <Entypo name='dots-three-vertical' size={30} />
                                            </TouchableOpacity>

                                        </View>
                                        : null}
                                    <Image
                                        style={styles.userIamge}
                                        source={item.user_image ? { uri: item.user_image } :

                                            require('../../Component/image/user.png')
                                        } />
                                </TouchableOpacity>

                            );
                        }}
                    />
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
        width: responsiveWidth(90),
        alignSelf: 'center',
        marginTop: responsiveHeight(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    iconView: {
        width: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerTEXT: {
        fontSize: responsiveFontSize(2),
        fontWeight: '900'
    },
    flatlistView: {
        marginTop: responsiveHeight(4),
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: responsiveWidth(90)
    },
    userIamge: {
        width: responsiveWidth(45),
        height: responsiveWidth(45),
    },
    iconeView2: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        flexDirection: 'row',


    }

})