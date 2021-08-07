import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthStackScreen from './src/screens/authetification/AuthStackScreen';
import {DrawerNavigatorStack} from './src/navigators/DrawerNavigatorStack';
import {AuthContext} from './src/context/AuthContext';
import {UserContext} from './src/context/UserContext';
import {useAuth} from './src/hooks/useAuth';



const RootStack = createStackNavigator();

const App = () =>
{ 
  const {auth, state} = useAuth();

  return (
    <AuthContext.Provider value = {auth}>
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}} >
        {
          !state.user ?
          <RootStack.Screen name = 'AuthStack' component={AuthStackScreen}/>
          : 
          <RootStack.Screen name = 'DrawerStack'>
            {
              () => (
                 <UserContext.Provider value={{user: state.user}}>
                    <DrawerNavigatorStack/>
                 </UserContext.Provider>
            )
            }        
          </RootStack.Screen>
        }       
      </RootStack.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
 
export default App;



 


