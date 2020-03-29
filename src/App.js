import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import MoviesRecommendation from "./pages/MoviesRecommendation";
import MoviesSearch from "./pages/MoviesSearch";
import UserPage from "./pages/UserPage";
import Footer from "./components/Footer";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import axios from 'axios';

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            loggedInStatus: JSON.parse(localStorage.getItem('loggedInStatus')) || false,
            user: JSON.parse(localStorage.getItem('user')) || {}
        };

        this.userStatus = this.userStatus.bind(this);
    }

    checkLoginStatue(){
        axios.get("http://localhost:9090/logged_in",
            {withCredentials: true})
            .then(response => {
                console.log("Logged in?")
            }).catch(error => console.log(("check login error" + error)))
    }


    userStatus(user){
        if(user){
            this.setState({
                loggedInStatus: true,
                user:user
            },() => {
                localStorage.setItem('loggedInStatus', JSON.stringify(this.state.loggedInStatus));
                localStorage.setItem('user', JSON.stringify(this.state.user))
            })

        }
        else {
            this.setState({
                loggedInStatus: false,
                user:{}
            },() => {
                localStorage.setItem('loggedInStatus', JSON.stringify(this.state.loggedInStatus));
                localStorage.setItem('user', JSON.stringify(this.state.user))
            })
        }

    }

    render() {

        return <div className="App">
            <Header/>

            <Tabs defaultActiveKey="recommend" id="uncontrolled-tab-example">
                <Tab eventKey="recommend" title="For You">
                    <MoviesRecommendation
                        loggedInStatus={this.state.loggedInStatus}
                        user={this.state.user}/>
                </Tab>
                <Tab eventKey="search" title="Search">
                    <MoviesSearch
                        loggedInStatus={this.state.loggedInStatus}
                        user={this.state.user}
                    />
                </Tab>
                <Tab eventKey="user" title="User" >
                    <UserPage
                        loggedInStatus={this.state.loggedInStatus}
                        user={this.state.user}
                        userStatus={this.userStatus}/>
                </Tab>
            </Tabs>

            <Footer/>

        </div>;


    }

}

export default App;
