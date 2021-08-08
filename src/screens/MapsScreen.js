import React, { useState, useEffect, useRef, useLayoutEffect} from "react";

import MapView, {PROVIDER_GOOGLE, Marker, Circle} from "react-native-maps";
import { View, 
        Text, 
        TouchableOpacity,
        StyleSheet,
        TextInput,
        Button,
        SafeAreaView, 
        Alert} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import styles from '../styles/mapScreenStyles';
import {BASE_URL} from '../config';

import {TabContext} from '../context/TabNavigatorContext';
import {UserContext} from '../context/UserContext';

const latitudeDelta = 0.01
const longitudeDelta = 0.01

const Map = () => {
  const {childData} = React.useContext(TabContext);
  const {user} = React.useContext(UserContext);

  const [region, setRegion] = useState({
    latitude: 46.6772292074,
    longitude: 28.0776175886,
    latitudeDelta,
    longitudeDelta
  });

  const [location, setLocation] = useState({
    latitude: null, 
    longitude: null
  });

  const [isAddingZone, setAddingZone] = useState(false);
  const [isLocationFixed, setLocationFixed] = useState(true);
  const [radius, setRadius] = useState(50);
  const [zoneName, setZoneName] = useState('');
  const mapRef = useRef(null);
 
  
  getData = () => {
    axios({
      method: 'get',
      url:  `${BASE_URL}/getLoc/${childData.params.child_name}`,
      headers: {"x-access-token" : user.jwt},
    }).then(res=>{
      console.log('from server: ' +  JSON.stringify(res.data.coordinates[0]));
      if(!isAddingZone){
      setLocation({
        latitude: res.data.coordinates[0],
        longitude: res.data.coordinates[1]
      })
    }
    }).catch(err => {
      console.log(err);
    })   
  }

  const createZone = () => {
    if(isLocationFixed)
     { 
       console.log('raza' , radius);
       console.log('latitudinea: ', region.latitude);
       console.log('longitude: ', region.longitude);
       console.log(zoneName)
       if(zoneName !== ''){    
       axios.post(`${BASE_URL}/addZone`,
      {
        childName: childData.params.child_name,
        zoneName : zoneName,
        radius : radius,
        coordinates: [region.latitude, region.longitude]
      },
      {
         headers: {"x-access-token" : user.jwt}
      }
      ).then(res=>{
           console.log(res.data)
           Alert.alert(
                "The zone was added!",
                [
                   {
                       text: "OK",
                   }
                ]
            )
          }
          ).catch(err => {
            console.log(err);
      })   
        
}}}

 useLayoutEffect(() => {
    console.log('start getting location');
    console.log(childData.params.child_name)
    getData();
    // const interval = setInterval(() => {
    //   getData()
    // }, 5000);
    //  return () => {
    //    clearInterval(interval);
    //    }
  }, []);

  useEffect(() => {
    centerMap();
}, [location]);

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
          (isAddingZone === false && location.latitude!==null && location.longitude!==null)?
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
      {/* fixed marker  */}
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
          <TextInput 
                style = {styles.zoneNameInput}
                onChangeText = {setZoneName}
          />
            <TouchableOpacity 
                    style = {styles.createZoneButton} 
                    placeholder="Zone Name"
                    placeholderTextColor="#666666"
                    onPress = {()=> {createZone()}}>
                <Text style = {styles.buttonText}>CREATE  ZONE</Text>
            </TouchableOpacity>
       </View>

      </View>:null
      
      }     
      </View>
    )
}


export default Map;



