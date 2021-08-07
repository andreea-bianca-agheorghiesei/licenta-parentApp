import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {UserContext} from '../context/UserContext';

const copii = [
    {name: 'Copil1'},
    {name: 'Copil2'},
]
const HomeScreen = ({navigation}) => {
  const {user} = React.useContext(UserContext);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen </Text>
      <Text style={{fontSize:20}}>Lista Copii</Text>
      {copii.map(
        (copil, i) => { 
            return (    
              <TouchableOpacity  key={i}
                onPress={()=> navigation.navigate('Tab',  {params:{child_name : copil.name}, screen: 'TabNavigator'} )}>
                <Text>{copil.name}</Text>
              </TouchableOpacity>
              )
          }
      )}                       
      <Button title = "Adauga Copil"/>        
    </View> 
  )
};


export default HomeScreen;
