import React from 'react';
import '../styles/Component.css';
import { Carousel } from 'react-bootstrap';
import logo from "../image/logo-r.png";



class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let movieposters = ['http://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', 'http://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'
        ,'http://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'];

        return (
            <div className="Header">
            <img className = "logo" width = {200} src = {logo}/>
            <Carousel>

                <Carousel.Item>
                    <img className= "headerimg" width={500}  alt="900x500" src={movieposters[0]}/>
                    <Carousel.Caption>
                        <h3>Top Recommendation For You</h3>
                        <p>Based on your preference.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className= "headerimg"width={500}  alt="900x500" src={movieposters[1]}/>
                    <Carousel.Caption>
                        <h3>Top Recommendation For You</h3>
                        <p>Based on your preference.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className= "headerimg"width={500}  alt="900x500" src={movieposters[2]}/>
                    <Carousel.Caption>
                        <h3>Top Recommendation For You</h3>
                        <p>Based on your preference.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>

        );
    }
}


export default Header;
