import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen </Text>
      <Button
        title = "Go to Map"
        onPress = {() => navigation.navigate('Map')}
      />
    </View> 
  )
};

export default HomeScreen;
