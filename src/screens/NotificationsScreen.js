import React from 'react';
import {View, Text, Button, TouchableOpacity, ScrollView} from 'react-native';
//import {TabContext} from '../context/TabNavigatorContext';
import {UserContext} from '../context/UserContext';
import Notification from '../components/Notification'
import {BASE_URL} from '../config';
import axios from 'axios';


const NotificationsScreen = () => {
  const [notifications, setNotifications] = React.useState([]);
  const {user} = React.useContext(UserContext);

 React.useEffect(()=> {
   console.log('in notificari');
     axios({
      method: 'get',
      url:  `${BASE_URL}/notifications`,
      headers: {"x-access-token" : user.jwt},
    }).then(({data}) => {
      console.log(JSON.stringify(data)); 
      setNotifications(data.notifications);
    }).catch((err) => {
      console.log(err.message)
    });

    return () => {
      console.log('aici')
      axios({
      method: 'put',
      url:  `${BASE_URL}/notifications`,
      headers: {"x-access-token" : user.jwt},
    }).then(({data}) => {
      console.log(data.message);
    }).catch((err) => {
      console.log(err.message)
    });
    }
  }, [])

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
     {notifications.reverse().map(
        (notification, i) => { 
            return (    
              <TouchableOpacity  key={i}>
                <Notification notification={notification}/>
              </TouchableOpacity>
              )
          }
      )} 
    </ScrollView> 
  )
};

export default NotificationsScreen;