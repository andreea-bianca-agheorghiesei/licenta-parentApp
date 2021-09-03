import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,

} from 'react-native';

import {AuthContext} from '../../context/AuthContext'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../styles/loginFormStyles';

const colors = {
    text : '#000000',
    background: '#fff'
}

const LoginScreen= ({navigation}) => {

    const {login} = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        secureTextEntry: true,
        email : '',
        password : '', 
        isValidUser : false,
        isPasswordValid : true,
        isEmailValid: false
    });

    const updateSecureTextEntry = () => {
        setData({
            ...data, 
            secureTextEntry: !data.secureTextEntry
        })
    }

    const passwordInputChange = (val) => {
        if( val.length >= 8 ) {
            setData({
                ...data,
                password : val,
                isPasswordValid : true
            });
        } else {
            setData({
                ...data,
                password : val,
                isPasswordValid : true
            });
        }
    }

     const emailInputCheck = (val) => {
     var emailRegex = /[a-z0-9._%-]+@[a-z0-9._%-]+\.[a-z]{2,4}/
      if (emailRegex.test(val))
      {
        setData({
          ...data, 
          email: val, 
          isEmailValid:true

        });
      }
      else{ 
        setData({
          ...data, 
          email: val, 
          isEmailValid:false
        });
      }
    }

    const errorAlert = (message) => {
         Alert.alert('Wrong Input!', message, [
                {text: 'Okay'}
            ]);
    }

    const loginHandle =  () => {
        if (!data.isEmailValid || !data.isPasswordValid) {
            errorAlert('Email or password invalid');
            return;
        }
        else {
            login(data.email, data.password).then(
                () => {}
            ).catch((err) => { 
                if(err.response.status === 403 || err.response.status === 404)
                   errorAlert('Email or password inavlid');
            }
            )
        }   
    }

    return (
      <View style={styles.container}>
         <StatusBar backgroundColor='#009387' barStyle="light-content"/>

        <View style={styles.header}>
            <Text style={styles.text_header}>Log In</Text>
        </View>

        <View style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.form_input}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {color: colors.text}]}
                    autoCapitalize="none"
                    keyboardType = {'email-address'}
                    onChangeText={(val) => emailInputCheck(val)}
                />

                {data.isEmailValid ? 
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                : null}
            </View>

            <Text style={styles.text_footer}>Password</Text>

            <View style={styles.form_input}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry = {data.secureTextEntry ? true:false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText = {(val) => passwordInputChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>   
                    {   
                    data.secureTextEntry?        
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />:
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                   }
                </TouchableOpacity>
            </View>

            { data.isPasswordValid ? null : 
                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            }
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}

                    onPress = { () => {loginHandle()}}
                   // onPress = {() => { login();}}
                >

                   <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Log In</Text>
                
                </TouchableOpacity>
                <View  style={styles.signupTextCont}>
					<Text styles = {[styles.textSign]}>Don't have an account yet? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Register')}><Text  style={[styles.textSign, {
                        color: '#009387',
                        fontWeight: 'normal'
                    }]}> Signup </Text></TouchableOpacity>
				</View>
            </View>
        </View>
      </View>
    );
};

export default LoginScreen;

