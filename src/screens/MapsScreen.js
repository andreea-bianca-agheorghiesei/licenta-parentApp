import React, { useState, useEffect, useRef } from "react";

import MapView, {PROVIDER_GOOGLE, Marker, Circle} from "react-native-maps";
import { View, 
        Text, 
        TouchableOpacity,
        StyleSheet,
        TextInput,
        Button,
        SafeAreaView} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios';
import styles from '../styles/mapScreenStyles';
const API_URL = 'http://10.0.2.2:3000/api/parent';

// To do : 
// 1. partea de urmarire a copilului (sa se miste markerul pe harta, etc)
// 2. sa dupa ce selectezi zona sa apara adresa in chestia aia de search (opt. sa poti cauta o adresa si sa iti apara pe harta)
// 3. sa trimiti la server zona




const latitudeDelta = 0.01
const longitudeDelta = 0.01

const Map = ({navigation}) => {
  const [region, setRegion] = useState({
    latitude: 46.6772292074,
    longitude: 28.0776175886,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  const [jwt, setJwt] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzUxMjU0OGE0MzlhMTdjMDhjNjg2MyIsImlhdCI6MTYyODAwNDAyMiwiZXhwIjoxNjI4MDkwNDIyfQ.n5EtEdFtIJjY4wFf08R6bVrrFxaSIxkNsaCS_a3Awgs')
  const [childName, setchildName] = useState('bobi')
  const [location, setLocation] = useState({
    latitude: 46.6772292074, 
    longitude: 28.0776175886
  });
  const [isAddingZone, setAddingZone] = useState(false);
  const [isLocationFixed, setLocationFixed] = useState(true);
  const [radius, setRadius] = useState(50);

  const mapRef = useRef(null);

  getData = () => {
    axios({
      method: 'get',
      url:  `${API_URL}/getLoc/${childName}`,
      headers: {"x-access-token" : jwt},
    }).then(res=>{
      console.log('from server: ' +  JSON.stringify(res.data.coordinates[0]));
      setLocation({
        latitude: res.data.coordinates[0],
        longitude: res.data.coordinates[1]
      })

    }).catch(err => {
      console.log(err);
    })   
  }

 useEffect(() => {
    console.log('start getting location');
    console.log(isAddingZone);
   // getData()
    // const interval = setInterval(() => {
    //   getData()
    // }, 5000);
     return () => {
      // clearInterval(interval)
       //setAddingZone(false)
       }
  }, []);

  onRegionChangeComplete = (region, isGesture) => {
    setRegion(region)

     if(isGesture.isGesture)
    { 
      setLocationFixed(true)
    }
  }

  onRegionChange = (region, isGesture) => {
    if(isGesture.isGesture)
    { 
      setLocationFixed(false)
    }
  }


  onAddRadius = () => {
    var r = radius;
    setRadius(r+50);
  }

  onSubstractRadius = () => {
    var r = radius;
    if(r>50)
    {
      setRadius(r-50);
    }
  }

  const centerMap = () => {
    const lat = location.latitude;
    const long = location.longitude;
    console.log(lat + " " + long)
    mapRef.current.animateToRegion ({
      latitude: lat,
      longitude: long,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    }, 400)
  
  }

 const onCloseButton = () => {
    setAddingZone(false);
    centerMap();
  }

    return (
      <View style={{flex: 1}}>
        <MapView
          ref = {mapRef}
          style={{flex: 1}}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
          onRegionChange = {onRegionChange}
        >
        
        {
          (isAddingZone === true && isLocationFixed === true) ? 
          <Marker
            coordinate = {{latitude: region.latitude, longitude: region.longitude}}
            pinColor = {"purple"} 
          />: null 
          
        }
        {
          (isAddingZone === false)?
          <Marker
            coordinate = {location}
            pinColor = {"purple"} 
          />:null 
        }

        {
          (isAddingZone === true && isLocationFixed === true) ? 
           <Circle
              center = {{latitude: region.latitude, longitude: region.longitude}}
              radius = {radius}
              fillColor = 'rgba(128,0,128, 0.3)'
              strokeColor = 'rgb(128,0,128)'
              strokeWidth = {2}
          />: null  
        }

        </MapView>

        {/* butonul pentru adaugare zona */}

       <TouchableOpacity style = {styles.addZoneButton} onPress = {() => setAddingZone(true)}>
          <Feather
              name = "plus-circle"
              size = {70}
              color = {"purple"}
              style = {{opacity: 0.7}}
          />
       </TouchableOpacity> 
      {/* fixed markerul  */}
        {
          (isAddingZone === true && isLocationFixed === false) ?  
          <View style={styles.markerFixed}>
            <View style={styles.marker} />
          </View> : null
        }
  
      {/* chestiile care apar atunci cand doresti sa alegi zona -- isAddingZone = true */}
      {
        (isAddingZone) ? 
      <View style={{
              position: 'absolute', 
            //  backgroundColor: 'green', 
              width: '100%',
              height: '100%',
              }}>
        {/* butoanele pentru marit si micsorat raza */}
        <View style={styles.radiusButtonsWrap}>
            <TouchableOpacity style = {styles.radiusButton} onPress = {onAddRadius}>
              <AntDesign name={'plus'} size = {30}/>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.radiusButton} onPress = {onSubstractRadius}>
              <AntDesign name={'minus'} size = {30}/>
            </TouchableOpacity>
        </View>

        {/* headerul pentru cautat zona */}
       <View style = {styles.addZoneHeader}> 
          <TouchableOpacity style = {styles.closeButton} onPress = {() => {onCloseButton()}} >
            <Ionicons name = 'close' size = {30} color={'rgba(0,0,0,0.75)'}/>
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <TextInput 
                placeholder="Search here"
                placeholderTextColor="#000"
                autoCapitalize="none"
                style={{flex:1,padding:0}}
            />
            <Ionicons name="ios-search" size={20} />
          </View>            
       </View>

       {/* footerul in care adaugi numele zonei */}
       <View style = {styles.createZoneFooter}>
          <TextInput style = {styles.zoneNameInput}/>
            <TouchableOpacity 
                    style = {styles.createZoneButton} 
                    placeholder="Zone Name"
                    placeholderTextColor="#666666">
                <Text style = {styles.buttonText}>CREATE  ZONE</Text>
            </TouchableOpacity>
       </View>

      </View>:null
      
      }     
      </View>
    )
}


export default Map;



