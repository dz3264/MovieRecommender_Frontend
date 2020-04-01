import React from 'react';
import '../styles/Component.css';
import { Carousel } from 'react-bootstrap';
import logo from "../image/logo-r.png";



class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let movieposters = ['https://image.tmdb.org/t/p/original/sTQSk8Kp9GpoCO4oy0iXSkvOM05.jpg', 'https://image.tmdb.org/t/p/original/5BwqwxMEjeFtdknRV792Svo0K1v.jpg'
        ,'https://image.tmdb.org/t/p/original/2XWhIg0aWX83ntm5Oq8w15vfB9c.jpg'];

        return (
            <div className="Header">
            <img className = "logo" width = {200} src = {logo}/>
            <Carousel className = "slides">

                <Carousel.Item>
                    <img className= "headerimg" width={1000}  alt="900x500" src={movieposters[0]}/>
                    <Carousel.Caption>
                        <h3>Popular Now</h3>
                        <p>Based on your preference.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className= "headerimg"width={1000}  alt="900x500" src={movieposters[1]}/>
                    <Carousel.Caption>
                        <h3>Popular Now</h3>
                        <p>Based on your preference.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className= "headerimg"width={1000}  alt="900x500" src={movieposters[2]}/>
                    <Carousel.Caption>
                        <h3>Popular Now</h3>
                        <p>Based on your preference.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>

        );
    }
}


export default Header;
