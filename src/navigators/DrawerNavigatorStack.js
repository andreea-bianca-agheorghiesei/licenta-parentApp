import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapsScreen';
import {TabNavigatorStack} from './TabNavigatorStack'
import {DrawerContent} from '../screens/DrawerContent';

const HomeStack = createStackNavigator();


const HomeStackScreen = ({navigation}) => {
    return (
    <HomeStack.Navigator screenOptions = {{
           headerStyle: {
            backgroundColor: '#BF55EC',
          },
      }}>

        <HomeStack.Screen name='Home' component = {HomeScreen}
              options = {{
                title: '',
                headerLeft: () => (
                  <Icon.Button name ='menu' size = {25} 
                    backgroundColor = "#BF55EC"
                    onPress = { () => navigation.openDrawer()}
                  ></Icon.Button>
                )
              }}
        /> 
      </HomeStack.Navigator>
    );
}


const Drawer = createDrawerNavigator()

export const  DrawerNavigatorStack = () => {
    return (
      <Drawer.Navigator
            drawerContent= {props=> <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home" component={HomeStackScreen}/>
        <Drawer.Screen name="Tab" component={TabNavigatorStack}/>
      </Drawer.Navigator> 
    )
};