import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Button, Modal, Pressable } from "react-native";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import { Icon } from "react-native-elements";
import { FAB } from "react-native-elements/dist/buttons/FAB";
import { Input } from "react-native-elements/dist/input/Input";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { ImagePickerResponse, launchCamera } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Config from "../core/Config";
import PersistDb, { AppUserType } from "../core/PersistDb";
import ImageResizer from 'react-native-image-resizer'
import rnfs from 'react-native-fs';
import { batch } from "react-redux";
import { BSON } from "realm";

const Users : React.FC = () => {
    const [users , setUsers] = useState<AppUserType[]>([])
    const [search, setSearch] = useState<string>()
    const [modalVisible, setModalVisible] = useState(false)

    const [camResponse, setCamResponse] = React.useState<ImagePickerResponse>();
    const userName = useRef<string>()
    const userAddress = useRef<string>()

    const [updateCount, setUpdateCount] = useState(0)

    const timer = useRef<NodeJS.Timeout | null>()

    useEffect(() => {
        setUsers(PersistDb.retrieveUsers())
    },[updateCount])

    const findUser = (value : string) => {
        setSearch(value)
        
        if(timer.current){
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            if(value === ''){
                setUsers(PersistDb.retrieveUsers())
            }else{
                setUsers(PersistDb.retrieveUsersByName(value))
            }
        },300)
    }

    const renderUserItem = (input : {item : AppUserType}) => {
        return <View style={styles.itemList}>
            <View style={{flex :1}}>
                <Image 
                    style={styles.itemImage}
                    source={{uri: `data:image/png;base64,${input.item.image}`}}/>
            </View>
            <View style={{flex :2, justifyContent:'center'}}>
                <View>
                    <Pressable 
                        onPress={() => {
                            DeleteUser(input.item._id)
                            PersistDb.deleteUser(input.item)
                            setUpdateCount(updateCount + 1)
                        }}>
                            <Icon style={{width:25,alignSelf:'flex-end'}} name="trash" type='font-awesome-5' size={15}/>
                    </Pressable>
                    
                </View>
                <View style={styles.itemText}>
                    <Text style={{flex : 2}}>Name:</Text>
                    <Text style={{flex : 4}}>{input.item.name}</Text>
                </View>
                <View style={styles.itemText}>
                    <Text style={{flex : 2}}>Address:</Text>
                    <Text style={{flex : 4}}>{input.item.address}</Text>
                </View>
            </View>
        </View>
    }

    return <>
        <View>
            <SearchBar
                placeholder="Name ..."
                // @ts-ignore
                onChangeText={findUser}
                inputContainerStyle={{ borderBottomWidth: 1, borderBottomColor:'black'}}
                platform='android'
                value={search}
            />
            <FlatList
                style={{marginBottom: 100}}
                data={users}
                renderItem={renderUserItem}
                keyExtractor={item => item._id}
            />
                
            <Modal
                animationType="fade" // or "slide" or "none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(!modalVisible);}}>
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalForm}>
                            <View style={styles.modalFormInput}>
                                <View style={{flex:1}}>
                                    <Text>Name</Text>
                                </View>
                                <View style={{flex:4}}>
                                    <Input onChangeText={(value) => { userName.current = value }}></Input>
                                </View>
                            </View>
                            <View style={styles.modalFormInput}>
                                <View style={{flex:1}}>
                                    <Text>Address</Text>
                                </View>
                                <View style={{flex:4}}>
                                    <Input onChangeText={(value) => { userAddress.current = value }}></Input>
                                </View>
                            </View>
                            <View style={styles.modalFormImage}>
                                <View style={{flex:1}}>
                                    <Text>Profile</Text>
                                </View>
    
                                <View style={{flex:4}}>
                                    <Pressable
                                        onPress={() => {
                                            launchCamera({
                                                saveToPhotos: false,
                                                mediaType: 'photo',
                                                includeBase64:true
                                            },setCamResponse)
                                        }}>

                                        {
                                            camResponse?.assets ? 
                                                <Image
                                                    resizeMethod="scale"                                      
                                                    style={{height : 100, aspectRatio:1}}
                                                    source={{uri : camResponse.assets![0].uri}}/> 
                                                :
                                                <Image
                                                    style={{height : 100, aspectRatio:1}}
                                                    source={require('../assets/images/profile_empty.png')}/>
                                        }
                                        
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        
                        <View style={styles.modalButtonGroup}>
                            <View style={styles.modalButtonItem}>
                                <Button onPress={() => setModalVisible(false)} title="Cancel"/>
                            </View>
                            <View style={styles.modalButtonItem}>
                                <Button onPress={async () => {
                                    
                                    let response = await ImageResizer.createResizedImage(
                                        camResponse!.assets![0].uri!, 250,250,"PNG",90)
                                
                                    let base64Img = await rnfs.readFile(response.uri, 'base64')

                                    AddUser(
                                        userName.current ?? "",
                                        userAddress.current ?? "",
                                        base64Img ?? ""
                                    )

                                    batch(() => {
                                        PersistDb.insertUser({
                                            _id: (new BSON.ObjectId()).toHexString(),
                                            name: userName.current ?? "",
                                            address: userAddress.current ?? "",
                                            image: base64Img,
                                            type: "User",
                                            username: ""
                                        })

                                        setUpdateCount(updateCount + 1)
                                        setCamResponse(undefined)
                                        setModalVisible(false)
                                    })
                                }} title="Add"/>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>

            <FAB
                style={styles.fabButton} 
                placement="right" 
                type="solid" 
                icon={<Icon  name="plus" type='font-awesome-5' color="white"></Icon> }
                containerStyle={{backgroundColor:"blue"}}
                size="small"
                onPress={() => setModalVisible(true)}
            />
        </View>
    </>
}

export default Users

const styles = StyleSheet.create({
    itemList : {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius : 5,
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        minHeight: 80,
        display: 'flex',
        flexDirection: 'row'
    },
    itemImage: {
        height:100,
        aspectRatio:1
    },
    itemText : {
        display: "flex",
        flexDirection: 'row'
    },
    modalContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent:{
        margin: 20,
        backgroundColor: "white",
        maxWidth: '90%',
        minWidth: '80%',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        display: "flex",
        flexDirection: 'column',
        maxHeight:300,
    },
    modalForm:{
        flex:1,
    },
    modalFormInput:{
        display:'flex',
        flexDirection: 'row',
        height: 45,
        alignItems:'center'
    },
    modalFormImage:{
        display:'flex',
        flexDirection: 'row',
        alignItems:'center'
    },
    modalButtonGroup:{
        display: 'flex',
        flexDirection: 'row',
    },
    modalButtonItem:{
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    fabButton : {
        position: 'absolute',
        bottom : 100
    }
})

const DeleteUser = async (id : string) => {
    let api = await Config.getApiKey()

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${api}`,
        }
    };

    await fetch(`http://10.0.2.2:3000/api/users/${id}`, requestOptions)
}

const AddUser = async (name : string, address : string, image : string) => {
    let api = await Config.getApiKey()

    const newUser = { 
        name : name,
        address : address,
        image : image
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${api}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    };

    fetch('http://10.0.2.2:3000/api/users', requestOptions)
}