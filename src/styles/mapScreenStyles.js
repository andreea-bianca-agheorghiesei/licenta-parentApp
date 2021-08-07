import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

// style pentru butonul de adaugat zona
   addZoneButton: {
     position: 'absolute',
     bottom: 0, 
     marginVertical: 30,
     padding: 5,
     alignSelf: "center",
     shadowColor: "#000",
     shadowOpacity: 0.3,
     shadowOffset: { x: 2, y: -2 },
     //borderWidth: 3,
     borderColor: 'rgba(128,0,128, 0.7)',
     borderRadius: 7,

   },

// cred ca ar trebui sa il numesc altfel 'footer'
//partea de jos atunci cand apesi pentru a adauga o zona
   createZoneFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopColor: '#DCDCDC',
    borderTopWidth: 1,
   },

   createZoneButton: {
     width: '55%',
     backgroundColor: 'rgba(128,0,128, 0.7)',
     marginVertical : 20,
     alignSelf: 'center',
     borderRadius: 15,
     elevation: 2,
   },

   buttonText: {
     alignSelf: 'center',
     fontSize: 20,
     fontWeight: 'bold',
     marginVertical: 10,
     color: 'white',
     letterSpacing: 2
   }, 

   zoneNameInput: {
     alignSelf: 'center',
     width: '70%',
     paddingVertical: 5,
     marginTop: 10,
     borderWidth: 1,
     borderColor: '#A9A9A9',
     borderRadius: 10
   },

// searchBoxul de sus
   searchBox: { 
    marginVertical: 10, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '83%',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },

// fake markerul 
  markerFixed: {
    left: '50%',
    marginLeft: -4,
    marginTop: -8,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 8,
    width: 8,
    borderRadius: 10,
    backgroundColor: 'purple'
  },

// butoanele de +/- radius
  radiusButtonsWrap: { 
    position:'absolute',
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    top: '40%',
    left: '90%'
  },
  radiusButton: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    padding: 5,
    marginRight:10,
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20
  },

  // add Zone HEADER

  addZoneHeader: {
    position: 'absolute',
   // alignSelf: 'flex-start',
    width: '100%',  
    flexDirection:"row",
  // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },

  closeButton : {
    alignSelf: 'center'
  }

 });

 export default styles;