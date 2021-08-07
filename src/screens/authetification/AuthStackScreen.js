import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const AuthStack = createStackNavigator();

const AuthStackScreen = ({navigation}) => {
    return (
    <AuthStack.Navigator 
        mode={'modal'}
        headerMode='none'>
        <AuthStack.Screen name = 'Login' component = {LoginScreen}/>
        <AuthStack.Screen name = 'Register' component = {RegisterScreen}/>
    </AuthStack.Navigator>
    );
};

export default AuthStackScreen;
