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
//import styles from '../../styles/loginFormStyles';

const colors = {
    text : '#000000',
    background: '#fff'
}


const LoginScreen= ({navigation}) => {

    const {login} = React.useContext(AuthContext);
    const [email, setEmail] = useState('bianca@gmail.com');
    const [password, setPassword] = useState('bianca');
    const [error, setError] = useState('');

    const setErrorMessage = (status) => { 
        if( status===404 || status === 403){
            setError('Email or password is invalid')
        }
    }
    useEffect(() => {
        return () => { setError('') }
    },[]);

    return (
        <View style = {styles.container}>
            <TextInput style = {styles.text_input}
                       placeholder = "email"
                       value={email}
                       onChangeText = {setPassword} />
            <TextInput style = {styles.text_input} 
                       placeholder = "password"
                       secureTextEntry
                       value={password}
                       onChangeText= {setPassword}/>
            <Text>{error}</Text> 
            <TouchableOpacity 
              style = {styles.button} 
              onPress = {async() => {
                  try{
                    await login(email, password)
                    }catch(err) {
                        setErrorMessage(err.response.status)
                    }
            }}>
                <Text>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text>go to register</Text>
            </TouchableOpacity>           
        </View>
    );
};

const styles = StyleSheet.create({ 
    container: { 
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 50
    },
    text_input: { 
        width: '60%',
        height: '6%',
        alignSelf: 'center',
        borderWidth: 1, 
        borderColor: 'black',
        marginVertical : 20,
    },
    button : { 
        paddingVertical : 10 ,
        paddingHorizontal : 20,
        borderWidth: 1,
        marginBottom: 20
    }
})

export default LoginScreen;

