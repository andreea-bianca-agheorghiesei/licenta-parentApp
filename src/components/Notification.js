import React from 'react';
import {
    View, 
    Text, 
    StyleSheet
} from 'react-native';

 const Notification = ({notification}) => {

    const {title, message, read, timestamp} = notification;
    const [time, setTime] = React.useState('');

    React.useEffect(() => {
        var date = new Date(timestamp);
        setTime(timeAgo(date));
    }, [])

    const timeAgo = (date) => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;
        if (interval > 1)   return date.toLocaleDateString("en-US", options) + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        interval = seconds / 2592000;
        if (interval > 1)   return date.toLocaleDateString("en-US", options)+ " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });;

        interval = seconds / 86400;
        if (interval > 1)   return date.toLocaleDateString("en-US", options) + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });;

        interval = seconds / 3600;
        if (interval > 1)   return Math.floor(interval) + " hours ago";

        interval = seconds / 60;
        if (interval > 1)  return Math.floor(interval) + " minutes ago";

        return Math.floor(seconds) + " seconds ago";
    }

    return (
        <View style = {[
            styles.container,
            read? styles.container_read : styles.container_unread
            ]}> 
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>{title}</Text>
                <Text style = {styles.time}>{time}</Text>
            </View>                     
            <Text style = {styles.message}>{message}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container : { 
        padding: 20,
        paddingTop: 10,
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 12,     
    },
    container_read: {
        borderColor: 'rgba(  0, 147, 135, 0.1 )',
        borderBottomWidth: 1,
    }, 
    container_unread: {
        backgroundColor:  'rgba(  0, 147, 135, 0.2 )',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        // marginBottom: 3,
        letterSpacing: 1,
        color: 'rgba(  0, 147, 135, 0.7 )'
    },
    message :{
        fontSize: 17,
        alignSelf: 'center',
        marginTop: 4,
    },
    time: {
        fontSize: 12,
        color: 'rgba(  0, 147, 135, 0.8 )'
    }
})

export default Notification;