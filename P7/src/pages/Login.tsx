import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { batch, useDispatch } from 'react-redux';
import Config from '../core/Config';
import PersistDb from '../core/PersistDb';
import { closeLoading, setAuthenticated, showLoading } from '../states/UISlice';

interface LoginPost{
    status: boolean,
    token: string
}

const Login : React.FC = () => {
    const usernameRef = useRef<string>("")
    const passwordRef = useRef<string>("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const actionLogin = async () => {
        dispatch(showLoading())

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username : usernameRef.current,
                password : passwordRef.current
            })
        };

        var result = await fetch('http://10.0.2.2:3000/api/login', requestOptions)

        if(result.ok){
            let response : LoginPost = await result.json()

            Config.storeApiKey(response.token)
            
            await PersistDb.retrieveData()

            batch(() => {
                dispatch(setAuthenticated(true))
                dispatch(closeLoading())
            })
        }else{
            batch(() => {
                setError('Invalid credentials')
                dispatch(closeLoading())
            })   
        }
    }

    return <>
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>P6 Demo</Text>

                <Text>Username</Text>
                <TextInput
                    style={styles.inputs}
                    onChangeText={(value) => usernameRef.current = value}
                />

                <Text>Password</Text>
                <TextInput
                    style={styles.inputs}
                    secureTextEntry={true}
                    onChangeText={(value) => passwordRef.current = value }
                />

                {error ? <Text style={styles.error}>{error}</Text> : <></>}

                <Button
                    title="Login"
                    onPress={() => { actionLogin() }}
                />
            </View>
        </View>
    </>
}

export default Login

const styles = StyleSheet.create({
    header:{
        fontSize:36,
        paddingBottom: 20,
    },
    error:{
        color: 'red'
    },
    inputs:{
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        minWidth: '50%',
        marginBottom: 10
    },
    container : {
        alignItems : 'center',
        justifyContent: 'center',
        flex: 1,
    }
})