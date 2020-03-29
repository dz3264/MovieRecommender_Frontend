import React from 'react';
import '../styles/Page.css';
import Registration from "../auth/Registration";
import Login from '../auth/Login';

class UserPage extends React.Component{
    render() {
        return <div className="User Page">
            <Registration/>
            <Login/>
        </div>;
    }

}

export default UserPage;
