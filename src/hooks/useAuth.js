import React from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import {createAction} from '../config/createAction';

export const useAuth = () => 
{ 
    const [state, dispatch] = React.useReducer((state, action) => {
      switch(action.type){
        case 'SET_USER':
          return {
            ...state, 
            user: {...action.payload},
          };
        case 'REMOVE_USER': 
          return{
            ...state, 
            user: undefined,
          };

        default: 
          return state;
      }
  }, ({ user: undefined,})
  );

  const auth = React.useMemo(
    () => ({
      login :  async (email, password) => {
        console.log('login');

        // const data = await axios.post( `${BASE_URL}/login`,{
        //   email: email, 
        //   paswword: password
        // },{timeout: 1000});
        const user = {
          email: email,
          token : 'un token'
        }

        // salvat undeva local
        // trebuia ca secure storage dar nu merge
        // deci trebuie folosit async...
        dispatch(createAction('SET_USER', user));
      },
      logout: () => {
        dispatch(createAction('REMOVE_USER'));
      },

      register : async(email, password, username) => {
        console.log('register'+" "+  email +" "+  password +" "+ username)
        // aceasi chestie pentru register ca la login 
        const {data} = await axios.post(`${BASE_URL}/register`,{
          email: email, 
          password: password,
          username: username
        }, {timeout: 1000});
         console.log(JSON.stringify(data));
      }    
  }), []);

  // React.useEffect(() => {
  //   SecureStorage.getItem('user').then(user => {
  //     cosole.log('user', user);
  //     if(user){
  //     dispatch(createAction('SET_USER', JSON.parse(user)));
  //     }
  //   })
  // })
  return {auth, state};
}