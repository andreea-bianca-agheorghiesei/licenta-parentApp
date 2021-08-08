import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {TabContext} from '../context/TabNavigatorContext'

const NotificationsScreen = () => {
  const {childData} = React.useContext(TabContext);

  React.useEffect(()=> {
    console.log('din notificari', childData.params.child_name)
  })
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Notification Screen </Text>
    </View> 
  )
};

export default NotificationsScreen;