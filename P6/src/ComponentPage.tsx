import React from 'react';
import { useState } from 'react';
import { Button, ActivityIndicator, View, FlatList, Text, StyleSheet, TextInput, Switch, Linking } from 'react-native';

interface ListItem {
    id : string,
    title : string
}

const ListData : ListItem[] = [
    { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'First Item'},
    { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Second Item'},
    { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Third Item' },
  ];
  
const renderListItem = (props : {  item : ListItem }) => (
    <View style={styles.listItem}>
        <Text>{ props.item.title } </Text>
    </View>
);

const ComponentPage = () => {
    const [switchEnabled, setSwitchEnabled] = useState<boolean>()

    return <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Button title="Example Button" onPress={() => {}}></Button>

        <View style={styles.container}>
            <Text>List Of Items : </Text>
            <FlatList
                data={ListData}
                renderItem={renderListItem}
                keyExtractor={item => item.id}
            />
        </View>


        <View style={styles.container}>
            <Text>Text Input</Text>
            <TextInput
                style={styles.textInput}
                editable
                maxLength={40}/>
        </View>
   
        <View style={styles.container}>
            <Text>Switch Input</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={switchEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => setSwitchEnabled(value)}
                value={switchEnabled}
            />
        </View>

        <View style={styles.container}>
            <Text>External Links</Text>
            <Button 
                title="React Native item"
                onPress={
                    () => 
                        Linking.openURL('https://reactnative.dev/docs/components-and-apis ')
                }
                />
        </View>
    </View>
}

export default ComponentPage

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
    },
    listItem : {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    },
    textInput:{
        borderColor: 'black',
        borderWidth: 1,
        padding: 10
    }
});