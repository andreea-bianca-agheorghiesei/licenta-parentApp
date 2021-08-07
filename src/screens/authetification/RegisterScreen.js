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
//import styles from '../../styles/loginFormStyles';

const colors = {
    text : '#000000',
    background: '#fff'
}

const RegisterScreen= ({navigation}) => {

    const {register} = React.useContext(AuthContext); 

    const [email, setEmail] = useState('bianca@gmail.com');
    const [password, setPassword] = useState('bianca');
    const [userName, setUserName] = useState('bianca');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <View style = {styles.container}>
            <TextInput style = {styles.text_input}
                       placeholder = "email"
                       value={email}
                       onChangeText = {setPassword} />
             <TextInput style = {styles.text_input}
                       placeholder = "username"
                       value={userName}
                       onChangeText = {setUserName} />
            <TextInput style = {styles.text_input} 
                       placeholder = "password"
                       secureTextEntry
                       value={password}
                       onChangeText= {setPassword}/>
            <Text>{error}</Text>    
            <TouchableOpacity style = {styles.button} 
                              onPress = {async () => {
                                  try{
                                      setLoading(true);
                                      await register(email, password, userName);
                                      navigation.pop();
                                  }catch(er) {
                                    setError(err.message)
                                    setLoading(false);
                                    console.log(err)
                                  }
                                  }}>
                <Text>REGISTER</Text>
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


export default RegisterScreen;
