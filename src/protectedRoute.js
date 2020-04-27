import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import fire from './config/Fire';

export const ProtectedRoute = ({component: Component,...rest}) => {
    
    return(
        <Route {...rest} render={
            (props) => {
                return <Component {...props} />
            }
       }/>
    )
}