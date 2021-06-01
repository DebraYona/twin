
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Logout extends Component{

    componentWillMount() {
        localStorage.removeItem("token")
        localStorage.removeItem("roleId")
        localStorage.removeItem("userId")
        localStorage.removeItem("recollectorId")
    }

    render(){
        return( <Redirect to={{pathname:'/login'}} />)
    }
}