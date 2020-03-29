import React from 'react';
import '../styles/Component.css';
import axios from 'axios';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:'',
            registrationErrors: ''
        };
        this.login = this.login.bind(this);
        this.handleChang = this.handleChang.bind(this);

    }
    login() {
        console.log("Form submitted");
        if (this.state.name === '') {
            console.log('Please enter a user name');
        }
        else {
            console.log('submit');

            axios.post('/api/login/', {
                    username: this.state.name,
                    userpass: this.state.password,
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
        return <div className="Registration">
            <form >
                <input
                    name="name"
                    placeholder='Your Name'
                    value={this.state.name}
                    onChange={this.handleChang}/>
                <input
                    type={'password'}
                    name="password"
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChang}/>
                <button type={'button'} onClick={this.login}>Login</button>
            </form>
        </div>;
    }

}

export default Login;
//https://www.youtube.com/watch?v=AWLgf_xfd_w&list=PLgYiyoyNPrv_yNp5Pzsx0A3gQ8-tfg66j&index=6