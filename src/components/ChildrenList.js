import React, {Component} from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const copii = [
    {name: 'Copil1'},
    {name: 'Copil2'},
]


const styles = StyleSheet.create({ 
    container: { 
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    item: { 
        padding:10
    }
})


const ChildrenList = ({navigation}) => { 
        return (
            <View style={styles.container}>
                <Text style={{fontSize:20}}>Lista Copii</Text>
                {copii.map(
                    (copil, i) => { 
                        return (    
                            <TouchableOpacity style={styles.item} key={i}
                                onPress={()=> navigation.navigate('TabNavigator', {child_name: copil.name} )}>
                                <Text>{copil.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                )} 
            </View>
        )
}


export default ChildrenList