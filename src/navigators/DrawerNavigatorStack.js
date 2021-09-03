import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapsScreen';
import Notifications from '../screens/NotificationsScreen';
import {TabNavigator} from './TabNavigatorStack'
import {DrawerContent} from '../screens/DrawerContent';

const HomeStack = createStackNavigator();


const HomeStackScreen = ({navigation}) => {
    return (
    <HomeStack.Navigator screenOptions = {{
           headerStyle: {
            backgroundColor: 'rgb(0, 147, 135)',
    
          },
      }}>

        <HomeStack.Screen name='Home' component = {HomeScreen}
              options = {{
                title: '',
                headerLeft: () => (
                  <Icon.Button name ='menu' size = {25} 
                    backgroundColor = 'rgba(0, 147, 135, 0.7)'
                    onPress = { () => navigation.openDrawer()}
                  ></Icon.Button>
                ),

                headerRight: () => (
                  <Icon.Button name ='ios-notifications-sharp' size = {25} 
                    backgroundColor = "rgba(0, 147, 135, 0.7)"
                    onPress = { () => navigation.navigate('Notifications')}
                  ></Icon.Button>
                )
              }}
        /> 
        <HomeStack.Screen name='Tab' component={TabNavigator} options = {{ headerShown:false}}/>
        <HomeStack.Screen name='Notifications' component={Notifications} options = {{ headerTintColor: '#fff'}}/>
      </HomeStack.Navigator>
    );
}


const Drawer = createDrawerNavigator()

export const  DrawerNavigatorStack = () => {
    return (
      <Drawer.Navigator
            drawerContent= {props=> <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={HomeStackScreen}/>
      </Drawer.Navigator> 
    )
};