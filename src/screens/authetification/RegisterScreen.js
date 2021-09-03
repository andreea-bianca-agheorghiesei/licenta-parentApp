import React, {useState} from 'react';
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


const RegisterScreen= ({navigation}) => {

    const {register} = React.useContext(AuthContext); 

    const [data, setData] = React.useState({
        secureTextEntry: true,
        isPasswordValid : true,
        isEmailValid : false,
        email : '',
        password : '', 
        username : '',
        isValidUser: false,
        errorMsg: null,
    });


    const alertErrorMessage = (status) => {
        if(status === 409)
        {
            Alert.alert(
                "This email is already in use",
                "Go to login screen",
                [
                   {
                       text: "Cancel",
                   },
                   {
                       text: "Okey",
                       onPress: () => {navigation.pop()}
                   }

                ]
            )
        }
    };

    const registerHandle =  () => {
        if( data.isEmailValid && data.isPasswordValid && data.isValidUser)
       {
            register(data.email, data.password).then(() => {})
                                                .catch((err) => { alertErrorMessage(err.response.status)}) 
       }
       else {
            Alert.alert('Wrong Input!', 'Input fields are invalid', [
                {text: 'Okay'}
            ]);
       }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data, 
            secureTextEntry: !data.secureTextEntry
        })
    }

    const passwordInputCheck = (val) => {
        if( val.length >= 8 ) {
            setData({
                ...data,
                password: val,
                isPasswordValid: true,
                errorMsg: null, 
            });
        } else {
            setData({
                ...data,
                password: val,
                isPasswordValid: false,
                errorMsg: 'Password must be 8 characters long.', 
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
          isEmailValid:true,
          errorMsg: null, 
        });
      }
      else{ 
        setData({
          ...data, 
          email: val, 
          isEmailValid:false,
          errorMsg: 'Wrong input! Email invalid!', 
        });
      }
    }

    const usernameInputCheck = (val) => {
        var regex = /^(?!\s*$).+/
        if(regex.test(val))
        {
        setData({
            ...data, 
            username: val, 
            isValidUser: false,
            errorMsg: 'Wrong input! Username is empty', 
        });
        }
        else{ 
        setData({
            ...data, 
            username: val,
            isValidUser: true,
            errorMsg: null, 
        });
        }
    }

    return (
      <View style={styles.container}>
         <StatusBar backgroundColor='#009387' barStyle="light-content"/>

        <View style={styles.header}>
            <Text style={styles.text_header}>Sign Up</Text>
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

            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.form_input}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {color: colors.text}]}
                />
            </View>

            <Text style={styles.text_footer}>Password</Text>

            < View style={styles.form_input}>
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
                    onChangeText = {(val) => passwordInputCheck(val)}
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

            {/* <Text style={styles.errorMsg}>{data.errorMsg}</Text> */}
            <View style={styles.button}>
                <TouchableOpacity
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                   onPress = {() => {registerHandle()}}
                >
                   <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>               
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
};




export default RegisterScreen;

