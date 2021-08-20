import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Modal, Alert} from 'react-native';
import {UserContext} from '../context/UserContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import ModalForm from '../components/ModalForm';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const {user} = React.useContext(UserContext);
  const [children, setChildren] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  
  React.useLayoutEffect(()=> {
     axios({
      method: 'get',
      url:  `${BASE_URL}/getChildren`,
      headers: {"x-access-token" : user.jwt},
    }).then(({data}) => {
      console.log(JSON.stringify(data.children));
      setChildren(data.children)
    }).catch((err) => {
      console.log(err.message)
    });
  }, [])

 const goToMaps = (child) => {
   console.log(child)
   if(!child.devices[0].activated){
      Alert.alert(
                "You're child device is not configured.",
                `Please introduce this code into the application: ${child.devices[0].token}`,
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
 
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical : '20%'}}>
      <Text style={{fontSize:20}}>Lista Copii</Text>
      {children.map(
        (child, i) => { 
            return (    
              <TouchableOpacity  key={i}
                onPress={()=> goToMaps(child) }>
                <Text>{child.name}</Text>
                <Text>{child.devices[0].token}</Text>
              </TouchableOpacity>
              )
          }
      )} 
      <Button title = "Adauga Copil" onPress = {() => setModalVisible(true)} />
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
})

export default HomeScreen;
