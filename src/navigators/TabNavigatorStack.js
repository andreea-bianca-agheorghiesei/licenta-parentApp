import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
// tab navigator
import Map from '../screens/MapsScreen';
import Zones from '../screens/ZonesScreen';

import {TabContext} from '../context/TabNavigatorContext';


//creating tab navigator
const Tabs = createBottomTabNavigator();

export const TabNavigator = ({route}) => { 
   return (
      <Tabs.Navigator
        screenOptions={ ({route}) => ({
          tabBarIcon: ({focused}) => { 
            let iconName;

            if(route.name === 'Map'){
              iconName = !focused ? 'map-outline' : 'map'   
            }
            else if(route.name === 'Zones'){ 
              iconName = !focused? 'ios-location-outline': 'ios-location-sharp'
            }

            return <Ionicons
                       name={iconName} 
                       color = {'rgb( 0,147,135)'}
                       size = {25}
                    />
          }
        })}

        tabBarOptions = {{
          showLabel: false,

        }}
      >      
        <Tabs.Screen name='Map'>
          {
            () => (
              <TabContext.Provider value={{childData: route.params}}>
                <Map/>
              </TabContext.Provider>
            )
          }
        </Tabs.Screen>

        <Tabs.Screen name='Zones'>
          {
            () => (
              <TabContext.Provider value={{childData: route.params}}>
                <Zones/>
              </TabContext.Provider>
            )
          }
        </Tabs.Screen>
      </Tabs.Navigator>

  )
}

