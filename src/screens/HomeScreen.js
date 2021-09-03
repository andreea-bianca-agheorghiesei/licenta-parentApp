import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Modal, Alert, ToastAndroid, ScrollView} from 'react-native';
import {UserContext} from '../context/UserContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import ModalForm from '../components/ModalForm';
import Child from '../components/Child';
import Ionicons from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import {SOCKET_URL}  from '../config';



const HomeScreen = ({navigation}) => {
  const {user} = React.useContext(UserContext);
  const [children, setChildren] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  const getChildren = () => {
    axios({
      method: 'get',
      url:  `${BASE_URL}/getChildren`,
      headers: {"x-access-token" : user.jwt},
    }).then(({data}) => {
     // console.log(JSON.stringify(data.children));
      setChildren(data.children) 
    }).catch((err) => {
      console.log(err.message)
    });
  }
  React.useLayoutEffect(()=> {
     getChildren();
  }, [modalVisible])

 const goToMaps = (child) => {
   console.log(child)
   if(!child.devices[0].activated){
      Alert.alert(
                "You're child device is not configured.",
                `Please introduce this code into the child application: ${child.devices[0].token}`,
                [
                   {
                       text: "OK",
                   }
                ]
            )
   }
   else{
     navigation.navigate('Tab', {params : {child_name : child.name}})
   }

 }
 
const showToastNotification = (data) => {
   Alert.alert(
                `${data.title}`,
                `${data.message}`,
                [
                  
                   {
                       text: "OK",
                   }
                ]
            )
}
 React.useEffect(() => {
      const socket = io.connect(SOCKET_URL, {auth: {jwt: user.jwt}});
      socket.on('connect', () => console.log('client connected to server socket ' + socket.id))
      socket.on("connect_error", (err) => console.log(err.message) );
      socket.on('error', (err) => console.log(err)) 
      socket.on('notification', (data) =>
      {
        console.log(data)
        showToastNotification(data.notification);
      })
      return () => {
        socket.disconnect();
        console.log('disconnect socket ....')
      }
  }, [])


  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical : '20%', backgroundColor: "white"}}>
      <ScrollView>
      {children.map(
        (child, i) => { 
            return (    
              <TouchableOpacity  key={i}
                onPress={()=> goToMaps(child) }>
                <Child  name = {child.name} token={child.devices[0].token} gender={child.gender}/>
              </TouchableOpacity>
              )
          }
      )}
      </ScrollView> 
      <Button title = "Add child" onPress = {() => setModalVisible(true)}  />
      <Modal
            animationType = "fade"
            transparent = {true} 
            visible = {modalVisible}
      >
        <View style = {styles.centeredView}>
          <View style = {styles.modalView}>
            <TouchableOpacity style = {styles.closeButton} onPress = {() => setModalVisible(false)} >
              <Ionicons name = 'close' size = {30} color={'rgba(0,0,0,0.75)'}/>
            </TouchableOpacity>
            <ModalForm/>
          </View>
        </View>
      </Modal>
      
          
    </View> 
  )
};

const styles = StyleSheet.create({
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: '50%'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  addChildButton: {
     width: '55%',
     color: 'rgba( 184, 155, 247, 0.7)',
     marginVertical : 20,
     alignSelf: 'center',
     borderRadius: 15,
     elevation: 2,
  }
})

export default HomeScreen;
