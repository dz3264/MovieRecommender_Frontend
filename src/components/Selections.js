import React from 'react';
import '../styles/Component.css';
import Button from 'react-bootstrap/Button';

class Selections extends React.Component{

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return <div className="Selections">

            <div className="ButtonGroup">
                <Button
                    className="SelectBtn"
                    variant={this.props.select === 0 ? "light": "outline-light" }
                    onClick={()=> this.props.change(0)}>
                    For You
                </Button>

                <Button
                    className="SelectBtn"
                    variant={this.props.select === 1 ? "light": "outline-light" }
                    onClick={()=> this.props.change(1)}>
                    Search
                </Button>

                <Button
                    className="SelectBtn"
                    variant={this.props.select === 2 ? "light": "outline-light" }
                    onClick={()=> this.props.change(2)}>
                    User
                </Button>
            </div>


        </div>;
    }

}

export default Selections;

//https://react-bootstrap.github.io/components/buttons/
