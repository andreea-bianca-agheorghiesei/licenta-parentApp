import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({ 
  container: { 
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  }
});



const Copil = ({route, navigation}) => { 
  const childName = route.params;
  console.log(route.params)
    return (
      <View style = {styles.container}>
        <Text style={styles.text}>{route.params.name}</Text>
      </View>

    );
}

export default Copil;