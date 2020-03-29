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


class App extends React.Component{

    constructor() {
        super();
        this.state = {
        };

    }

    render() {

        return <div className="App">
            <Header/>

            <Tabs defaultActiveKey="recommend" id="uncontrolled-tab-example">
                <Tab eventKey="recommend" title="For You">
                    <MoviesRecommendation/>
                </Tab>
                <Tab eventKey="search" title="Search">
                    <MoviesSearch />
                </Tab>
                <Tab eventKey="user" title="User" >
                    <UserPage/>
                </Tab>
            </Tabs>

            <Footer/>

        </div>;


    }

}

export default App;
