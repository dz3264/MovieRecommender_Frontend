import React from 'react';
import '../styles/Component.css';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class SearchBar extends React.Component{

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return <div className="Searchbar">
            <div className="Sort SearchDetail">
                <div>
                    Sort By:
                </div>
                <Dropdown className="SearchInputArea">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {this.props.sortShow}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>this.props.changeSort('Popularity','-popularity')}>Popularity</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.changeSort('Release Date','-release_date')}>Release Date</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.changeSort('Revenue','-revenue')}>Revenue</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.changeSort('Runtime','-runtime')}>Runtime</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>

            <div className="Genre SearchDetail">
                <div>
                    Select Genre:
                </div>
                <Dropdown className="SearchInputArea">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {this.props.genreShow}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('All','')}>All</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Action','Action')}>Action</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Adventure','Adventure')}>Adventure</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Animation','Animation')}>Animation</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Children','Children')}>Children</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Comedy','Comedy')}>Comedy</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Crime','Crime')}>Crime</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Documentary','Documentary')}>Documentary</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Drama','Drama')}>Drama</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Fantasy','Fantasy')}>Fantasy</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Romance','Romance')}>Romance</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Horror','Horror')}>Horror</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Mystery','Mystery')}>Mystery</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Thriller','Thriller')}>Thriller</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Sci-Fi','Sci-Fi')}>Sci-Fi</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('IMAX','IMAX')}>IMAX</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('War','War')}>War</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Musical','Musical')}>Musical</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Western','Western')}>Western</Dropdown.Item>
                        <Dropdown.Item onClick={()=>this.props.selectGenre('Film-Noir','Film-Noir')}>Film-Noir</Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <div className="SearchDetail">
                <Form className="SearchInputArea">
                    <Form.Group className="SearchInput">
                        <Form.Control
                            placeholder="Search Movies"
                            onChange={this.props.changeKeyword}
                            value={this.props.keyword}
                        />
                    </Form.Group>
                </Form>

            </div>


            <div className="SearchBtn SearchDetail">
                <Button variant="light" onClick={()=>this.props.searchMovie(1)}>Search</Button>

            </div>


        </div>;
    }

}

export default SearchBar;

//https://react-bootstrap.github.io/components/buttons/
