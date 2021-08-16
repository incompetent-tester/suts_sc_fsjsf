import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import ComponentPage from './src/ComponentPage';

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StackPages />     
            </NavigationContainer>
        </SafeAreaProvider>
    );
};
    
export default App;

/* -------------------------------------------------------------------------- */
/*                              Stack Navigation                              */
/* -------------------------------------------------------------------------- */
export type RootStackParamList = {
    Home: undefined
    SecondPage: { input : string},
    TabPage : undefined
    ComponentPage: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const StackPages : React.FC  = () => {
    const sharedOptions: StackNavigationOptions = {
        headerStyle: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,

            elevation: 5,
        },
    }

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={HomePage}
                options={sharedOptions} />
            <Stack.Screen
                name="SecondPage"
                component={SecondPage}
                initialParams={{ input : "Empty" }}
                options={sharedOptions} />
            <Stack.Screen 
                name="TabPage"
                component={TabNavigation}
                options={sharedOptions}/>
            <Stack.Screen 
                name="ComponentPage"
                component={ComponentPage}
                options={sharedOptions}/>    
        </Stack.Navigator>
    )
}

/* ---------------------------- Hello world page ---------------------------- */
interface HomeProps {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>
    route: RouteProp<RootStackParamList, 'Home'>;
}

const HomePage : React.FC<HomeProps> = (props) => {
    return <SafeAreaView style={styles.container}>
        <View>
            <Text style={{textAlign:'center',paddingBottom:50}}>Hello World</Text>
            <Button title="Goto Second Page" onPress={() => 
                {
                    props.navigation.navigate(
                        "SecondPage", 
                        {input : "You have just entered this page"}
                )}
            }/>
            <Button title="Goto Tab Navigation" onPress={() => {
                props.navigation.navigate("TabPage")  
            }}/>
            <Button title="Goto Components Showcase" onPress={() => {
                props.navigation.navigate("ComponentPage")  
            }}/>
        </View>
    </SafeAreaView>
}

/* ------------------------------- Second Page ------------------------------ */

interface SecondPageProps {
    navigation: StackNavigationProp<RootStackParamList, 'SecondPage'>
    route: RouteProp<RootStackParamList, 'SecondPage'>;
}

const SecondPage : React.FC<SecondPageProps> = (props) => {
    return <SafeAreaView style={styles.container}>
        <View>
            <Text>Second Page</Text>
            <Text>{props.route.params.input}</Text>
        </View>
    </SafeAreaView>;
}

/* -------------------------------------------------------------------------- */
/*                               Tab Navigation                               */
/* -------------------------------------------------------------------------- */
export type RootTabParamList = {
    TabPage1 : undefined
    TabPage2 : undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="TabPage1"
                options={{
                    tabBarIcon: (props) => {
                        return <Icon name="chart-bar" type='font-awesome-5' size={props.size} color={props.color} />
                    }
                }}
                component={TabPage1} />
            <Tab.Screen
                name="TabPage2"
                options={{
                    tabBarIcon: (props) => {
                        return <Icon name='rowing' size={props.size} color={props.color} />
                    }
                }}
                component={TabPage2} />
        </Tab.Navigator>
    );
}

/* ------------------------------- Tab Page 1 ------------------------------- */
type TabPage1Props = {
    navigation: BottomTabNavigationProp<RootTabParamList, 'TabPage1'>
    route: RouteProp<RootTabParamList, 'TabPage1'>
}

const TabPage1: React.FC<TabPage1Props> = (props) => {
    return (
        <View>
            <View><Text>Tab Page 1 content</Text></View>
        </View>
    )
}

/* ------------------------------- Tab Page 2 ------------------------------- */
type TabPage2Props = {
    navigation: BottomTabNavigationProp<RootTabParamList, 'TabPage2'>
    route: RouteProp<RootTabParamList, 'TabPage2'>
}

const TabPage2: React.FC<TabPage2Props> = (props) => {
    return (
        <View>
            <View><Text>Tab Page 2 content</Text></View>
        </View>
    )
}

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});