import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Selections from "./components/Selections";
import MoviesRecommendation from "./pages/MoviesRecommendation";
import MoviesSearch from "./pages/MoviesSearch";
import UserPage from "./pages/UserPage";
import Footer from "./components/Footer";
import PageTurning from "./components/PageTurning";

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            current:0
        };

        this.changePage = this.changePage.bind(this);
    }


    changePage(select) {
        this.setState({ current: select });
    }

    render() {

        const currentPage = this.state.current;
        let page;
        if (currentPage === 0) {
            page = <MoviesRecommendation/>;
        } else if (currentPage === 1) {
            page = <MoviesSearch />;
        } else {
            page = <UserPage/>;
        }
        return <div className="App">
            <Header/>
            <Selections select={this.state.current} change={this.changePage}/>
            {page}
            <PageTurning/>
            <Footer/>

        </div>;


    }

}

export default App;
