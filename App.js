import React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapsScreen'
import DetailsScreen from './src/screens/DetailsScreen';
import {DrawerContent} from './src/screens/DrawerContent';
import AuthStackScreen from './src/screens/authetification/AuthStackScreen';
import {AuthContext} from './src/context/AuthContext';
import axios from 'axios';
import {BASE_URL} from './src/config' 
import {createAction} from './src/config/createAction' 

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => {
    return (
    <HomeStack.Navigator screenOptions = {{
           headerStyle: {
            backgroundColor: '#BF55EC',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
      }}>

        <HomeStack.Screen name='Home' component = {HomeScreen}
              options = {{
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

const DetailsStackScreen = ({navigation }) => {
    return (
    <DetailsStack.Navigator screenOptions = {{
           headerStyle: {
            backgroundColor: '#f45b1e',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
      }}>

        <DetailsStack.Screen name='Details' component = {DetailsScreen} 
          options = {{
                headerLeft: () => (
                  <Icon.Button name ='menu' size = {25} 
                    backgroundColor = "#f45b1e"
                    onPress = { () => navigation.openDrawer()}
                  ></Icon.Button>
                )
              }}
        /> 
      </DetailsStack.Navigator>
    );
}

const Drawer = createDrawerNavigator()

const App = () =>
{ 
  const [state, dispatch] = React.useReducer((state, action) => {
      switch(action.type){
        case 'SET_USER':
          return {
            ...state, 
            user: {...action.payload},
          };
        default: 
          return state;
      }
  }, ({ user: undefined,})
  );

  const auth = React.useMemo(
    () => ({
      login :  async (email, password) => {
        console.log('login' +" "+ email + " " + password)
        //aici facem apelul catre server
        console.log(BASE_URL)
        const data = await axios.post( `${BASE_URL}/login`,{
          email: email, 
          paswword: password
        },{timeout: 1000});
        const user = {
          // email: data.email, 
          jwt: data.jwt
        }
        dispatch(createAction('SET_USER', user));
        console.log(JSON.stringify(data));

      },
      logout: () => {
        console.log('logout')
      },
      register : async(email, password, username) => {
        console.log('register'+" "+  email +" "+  password +" "+ username)
        // aceasi chestie pentru register ca la login 
        const {data} = await axios.post(`${BASE_URL}/register`,{
          email: email, 
          password: password,
          username: username
        }, {timeout: 1000});
         console.log(JSON.stringify(data));
      }    
  }), []);

  return (
    <AuthContext.Provider value = {auth}>
    <NavigationContainer initialRouteName = "Home">
      <AuthStackScreen/>
      {/* <Drawer.Navigator drawerContent= {props=> <DrawerContent {...props}/>}>
          <Drawer.Screen name="Home" component={HomeStackScreen}/>
          <Drawer.Screen name="Map" component={MapScreen}/>
      </Drawer.Navigator> */}
      {/* <Map/> */}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
 
export default App;



 


