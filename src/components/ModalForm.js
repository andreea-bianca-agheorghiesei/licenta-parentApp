import React from 'react';
import {
        TextInput, 
        View, 
        Switch,
        Text,
        Button,
        Alert
        } from 'react-native';

import {BASE_URL} from '../config';
import axios from 'axios';
import {UserContext} from '../context/UserContext';


const ModalForm = () => {
    const [childName, setChildName] = React.useState('');
    const [childGender, setChildGender] = React.useState('');
    const [switchEnable, setSwitchEnable] = React.useState(false);
    const [childAdded, setChildAdded] = React.useState(false);
    const [generatedToken, setGeneratedToken] = React.useState(undefined);
    const {user} = React.useContext(UserContext);
    const changeGender = () => {
    setSwitchEnable(previousState => !previousState)
  }

  React.useEffect(()=>{
    if(!switchEnable)
      setChildGender('Girl');
    else
      setChildGender('Boy');
  },[switchEnable]);

  const addChild = () => {
    console.log(childName, childGender);
    axios.post(`${BASE_URL}/addChild`,
    {
      childName: childName, 
      gender: childGender
    },
    {
      headers: {"x-access-token" : user.jwt}
    }).then(({data}) => {
      console.log(JSON.stringify(data));
      setGeneratedToken(data.token);
    }).catch((err) => {
      console.log(err.response.status)
      if(err.response.status === 400)
      {
        Alert.alert(
                "You already introduced a child with this name",
                "Please choose another name",
                [
                   {
                       text: "OK",
                   }
                ]
            )
      }
    });
  }

  const getDeviceToken = () => {
     axios.post(`${BASE_URL}/addDevice`,
        {
          childName: childName, 
        },
        {
          headers: {"x-access-token" : user.jwt}
        }).then(({data}) => {
          console.log();
          setGeneratedToken(data.token)
          setChildAdded(true);
        }).catch((err) => {
          console.log(err.response.data)
        })
  }

    return(
    <View >

        <View style={{justifyContent: 'space-around', height: 250, width: 200}}>
          <TextInput placeholder='Enter child name'
                      onChangeText = {setChildName}
          />
          <View style = {{flexDirection : "row"}}>
              <Switch trackColor = {{false: '#F4C2C2' , true: '#C5EAFA'}}
                      thumbColor = {switchEnable ? '#7fd5fa' : '#f88a8a'}
                      onValueChange = {changeGender}
                      value = {switchEnable}
              />
              <Text>{childGender}</Text>
          </View>
          {
            (generatedToken !== undefined) ? 
            <View>
              <Text>Child was added succesfully. Please introduce the into your child application</Text>
              <Text>{generatedToken}</Text>
            </View>
            :
            <Button title = "Add" onPress = {() => addChild()}/>      
          }            
        </View>    
    </View>

    )
}

export default ModalForm;