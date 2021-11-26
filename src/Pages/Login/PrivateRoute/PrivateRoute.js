import React from 'react';
import { CircularProgress } from '@mui/material';
import {Route, Redirect} from 'react-router-dom'
import useAuth from '../../../hooks/UseFirebase/UseAuth';

const PrivateRoute = ({children,...rest}) => {
    
    const {user, isLoading} = useAuth();
    if(isLoading){
        return <CircularProgress/>
    }
    return (
        <Route
        {...rest}
        render = {({location})=>
        user.email ? (
            children
        ) : (
            <Redirect
            to= {{
                pathname :"/login",
                state : { from : location}
            }}
            />
        )
        
        }>
  
        </Route>
      );
  };
      

export default PrivateRoute;