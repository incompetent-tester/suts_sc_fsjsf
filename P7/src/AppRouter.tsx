import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { Button, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import AppOverlay from './AppOverlay';
import Config from './core/Config';
import PersistDb from './core/PersistDb';
import Baskets from './pages/Baskets';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import Users from './pages/Users';
import { AppRootState } from './states/AppStore';
import { setAuthenticated } from './states/UISlice';
import { createDrawerNavigator } from "@react-navigation/drawer";

const AppRouter = () => {
    const authenticated = useSelector<AppRootState>(state => state.ui.authenticated)

    useEffect(()=>{
        const init = async () =>{
            let key = await Config.getApiKey()
            setAuthenticated(!!key)

            await PersistDb.init()

            if(key){
                await PersistDb.retrieveData()
            }
        }

        init()
    },[])

    return (
        <SafeAreaProvider>
            <AppOverlay>
                {
                    authenticated ? 
                        <NavigationContainer>
                            <MainNavigator />     
                        </NavigationContainer>
                        :
                        <Login />
                }
            </AppOverlay>
        </SafeAreaProvider>
    )
}

export default AppRouter


/* -------------------------------------------------------------------------- */
/*                                   Drawer                                   */
/* -------------------------------------------------------------------------- */
const Drawer = createDrawerNavigator();

interface DrawerContentProps {
    onLogout : () => void
}
const DrawerContent: React.FC<DrawerContentProps> = (props) => {
    return (
        <View>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <View style={{width:'100%'}}>
                        <Button title="Logout" onPress={props.onLogout}/>
                    </View>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

/* -------------------------------------------------------------------------- */
/*                               Main Navigation                              */
/* -------------------------------------------------------------------------- */
const MainNavigator : React.FC = () => {
    const dispatch = useDispatch()

    const actionLogout = async () => {
        await Config.storeApiKey('')
        dispatch(setAuthenticated(false))
    }

    return (
        <>
            <Drawer.Navigator
                drawerContent={(_) => <DrawerContent onLogout={actionLogout} />}>
                <Drawer.Screen name="main" component={TabNavigation} options={{ headerShown: false}}/>
            </Drawer.Navigator>

        </>
    );
}


/* -------------------------------------------------------------------------- */
/*                              Stack Navigation                              */
/* -------------------------------------------------------------------------- */
export type RootTabParamList = {
    Home : undefined
    Products : undefined
    Users : undefined
    Baskets : undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: (props) => {
                        return <Icon name="chart-bar" type='font-awesome-5' size={props.size} color={props.color} />
                    }
                }}
                component={Home} />
            <Tab.Screen
                name="Users"
                options={{
                    tabBarIcon: (props) => {
                        return <Icon name='user' type="ant-design" size={props.size} color={props.color} />
                    }
                }}
                component={Users} />
            <Tab.Screen
                name="Products"
                options={{
                    tabBarIcon: (props) => {
                        return <Icon name='shoppingcart' type='ant-design' size={props.size} color={props.color} />
                    }
                }}
                component={Products} />
            <Tab.Screen
                name="Baskets"
                options={{
                    tabBarIcon: (props) => {
                        return <Icon name='shopping-basket' type='entypo' size={props.size} color={props.color} />
                    }
                }}
                component={Baskets} />
        </Tab.Navigator>
    );
}