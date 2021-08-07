import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
// tab navigator
import Map from '../screens/MapsScreen'
import Notifications from '../screens/NotificationsScreen'



//creating tab navigator
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => { 
   return (
      <Tabs.Navigator
        screenOptions={ ({route}) => ({
          tabBarIcon: ({focused}) => { 
            let iconName;

            if(route.name === 'Map'){
              iconName = !focused ? 'map-outline' : 'map'   
            }
            else if(route.name === 'Not'){ 
              iconName = !focused? 'ios-notifications-outline': 'ios-notifications-sharp'
            }

            return <Ionicons
                       name={iconName} 
                       color = {'purple'}
                       size = {25}
                    />
          }
        })}

        tabBarOptions = {{
          showLabel: false,

        }}
      >      
        <Tabs.Screen name='Map' component={Map}/>
        <Tabs.Screen name='Not' component={Notifications}/>
      </Tabs.Navigator>

  )
}

export const TabNavigatorStack = () => {
    return (
    <Stack.Navigator screenOptions = {{
           headerStyle: {
            backgroundColor: '#BF55EC',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
      }}>

        <Stack.Screen name='TabNavigator' component = {TabNavigator} options={ ({route}) => ({title:route.params.child_name})}/> 
      </Stack.Navigator>      
    )
}