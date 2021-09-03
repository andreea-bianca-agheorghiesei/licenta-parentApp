import React from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity
} from 'react-native';

 const Child = ({name,gender,token}) => {

    return (

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
         <TouchableOpacity style = {styles.circle}/>
         <View style={styles.container}>
            <Text style={{color: 'rgba(   69, 68, 69 , 0.65)', fontSize: 17, fontWeight: '700'}}>{name}</Text>
            <Text style={{color: 'rgba(   69, 68, 69   , 0.5)', fontSize: 14, fontWeight: '500'}}>{gender}</Text>
         </View>
         <Text style={{color: 'rgb( 69, 68, 69 )', fontSize: 17, fontWeight: '500', marginLeft: 5}}>{token}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container : { 
        borderColor: 'rgba(  0, 147, 135, 0.3 )',
        borderBottomWidth: 1,  
        width: '60%'
    },
    circle: {
      backgroundColor: 'rgba(  0, 147, 135, 0.3 )',
      borderRadius: 20, 
      padding: 15, 
      margin : 10
    }
   
})

export default Child;