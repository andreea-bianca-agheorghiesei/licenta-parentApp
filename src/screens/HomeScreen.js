import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {UserContext} from '../context/UserContext';
import axios from 'axios';
import {BASE_URL} from '../config';


const HomeScreen = ({navigation}) => {
  const {user} = React.useContext(UserContext);
  const [children, setChildren] = React.useState([]);

  React.useLayoutEffect(()=> {
     axios({
      method: 'get',
      url:  `${BASE_URL}/getChildren`,
      headers: {"x-access-token" : user.jwt},
    }).then(({data}) => {
      console.log(JSON.stringify(data.children));
      setChildren(data.children)
    }).catch((err) => {
      console.log('am eroare')
    });
  }, [])

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical : '20%'}}>
      <Text style={{fontSize:20}}>Lista Copii</Text>
      {children.map(
        (child, i) => { 
            return (    
              <TouchableOpacity  key={i}
                onPress={()=> navigation.navigate('Tab',  {params:{child_name : child.name}, screen: 'TabNavigator'} )}>
                <Text>{child.name}</Text>
              </TouchableOpacity>
              )
          }
      )}                       
      <Button title = "Adauga Copil"/>        
    </View> 
  )
};


export default HomeScreen;
