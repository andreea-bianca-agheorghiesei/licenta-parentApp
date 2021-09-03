import {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import {SOCKET_URL}  from '../config';

const useWebSockets = ({token, user}) => {
   const {user} = React.useContext(UserContext);
   var socket;

   const initiateSocket = () => {
       socket = io(SOCKET_URL);
    }
}