import React from 'react';
import '../styles/Component.css';
import axios from 'axios';
import Button from "react-bootstrap/Button";

class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            password_confirmation: '',
            registrationErrors: ''
        };
        this.register = this.register.bind(this);
        this.handleChang = this.handleChang.bind(this);

    }
    register() {
        console.log("Form submitted");
        if (this.state.name === '') {
            console.log('Please enter a user name');
        } else if (this.state.password === '' || this.state.password !== this.state.password_confirmation) {
            console.log('passwords are differnet');
        } else {
            console.log('submit');

            axios.post('/api/register/', {
                    username: this.state.name,
                    userpass: this.state.password,
                    userhistory: {},
                    usertags: {}
                }, {withCredentials: true}
            )
                .then(response => {
                    this.setState({
                        userid: response.data.userid,
                        name: response.data.username,
                        userhistory: response.data.userhistory,
                        usertags: response.data.usertags
                    });
                    this.props.userStatus({
                        userid: response.data.userid,
                        name: response.data.username,
                        userhistory: response.data.userhistory,
                        usertags: response.data.usertags
                    });
                    console.log(
                        response.data.userid,
                        response.data.username,
                        response.data.userhistory,
                        response.data.usertags)

                }).catch(error => {
                console.log("error: ", error)
            });
        }
    }
    handleChang(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    render() {
        return <div className="Registration left_col">
            <form className="myForm">
                <input
                    className='myInput'
                    name="name"
                    placeholder='Your Name'
                    value={this.state.name}
                    onChange={this.handleChang}/>
                <input
                    className='myInput'
                    type={'password'}
                    name="password"
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChang}/>
                <input
                    className='myInput'
                    type={'password'}
                    name="password_confirmation"
                    placeholder='Password Confirmation'
                    value={this.state.password_confirmation}
                    onChange={this.handleChang}/>
                <Button className='FormBtn' variant="outline-light" onClick={this.register}>Sign Up</Button>
            </form>
        </div>;
    }

}

export default Registration;
//https://www.youtube.com/watch?v=AWLgf_xfd_w&list=PLgYiyoyNPrv_yNp5Pzsx0A3gQ8-tfg66j&index=6