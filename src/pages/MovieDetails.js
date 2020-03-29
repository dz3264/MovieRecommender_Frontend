import React from 'react';
import '../styles/Component.css';
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Rating from "react-rating";
import star_full from '../asset/star_full.png';
import star_empty from '../asset/star_empty.png';


class MovieDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show : true,
            rating: 0,
        };
        this.changeRating = this.changeRating.bind(this);
    }

    changeRating(e){
        this.setState({
            rating:e
        })
    }

    componentDidMount() {
        console.log('get rating');
        fetch("/api/rating/"+this.props.movie['movieid'])
            .then(res => res.json())
            .then(
                (result) => {
                    let rating = result.average ? Math.round(result.average * 10) / 10 : '--';
                    this.setState({
                        averageRating: rating,
                    });
                    //console.log(result);
                },
                (error) => {
                    console.log('error here: ',error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        let genres = [];
        for (var i = 0; i < this.props.details['genres'].length; i++) {
            let g = this.props.details['genres'][i];
            genres.push(g['name']);
            if (i !== this.props.details['genres'].length-1){
                genres.push(' | ');
            }
        }
        let countries = [];
        for (var j = 0; j < this.props.details['production_countries'].length; j++) {
            let c = this.props.details['production_countries'][j];
            countries.push(c['name']);
            if (j !== this.props.details['production_countries'].length-1){
                countries.push(' | ');
            }
        }

        return <div className="MovieDetails">
            <Modal
                show={this.state.show}
                onHide={() => this.setState({show:false})}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.movie['title'].split("(")[0]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='Moviedetails'>
                    <div className='Detailinfo'>
                        {this.props.details['tagline'] ?
                            <div className='tagline'>{this.props.details['tagline']}</div>
                                : null}
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>Original Title</th>
                                <th>{this.props.details['original_title']}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>

                                <td>Release Date</td>
                                <td>{this.props.movie['release_date']}</td>
                            </tr>
                            { genres.length !==0 ?
                                <tr>
                                <td>Genres</td>
                                <td>{genres}</td>
                                </tr>
                                : null}
                            <tr>
                                <td>Runtime</td>
                                <td>{this.props.movie['runtime']} mins</td>
                            </tr>
                            <tr>
                                <td>Production Country</td>
                                <td>{countries}</td>
                            </tr>
                            <tr>
                                <td>TMDB Vote</td>
                                <td>{this.props.details['vote_average']}</td>
                            </tr>
                            <tr>
                                <td>User Ratings</td>
                                <td>{this.state.averageRating}</td>
                            </tr>
                            </tbody>
                        </Table>

                        <div className='overview'>{this.props.details['overview'] ?
                            this.props.details['overview']
                            : null}
                        </div>
                        <div className='Rating'>
                            <div>Your Rating: </div>
                            <Rating
                                initialRating={this.state.rating}
                                fractions={2}
                                onClick={(e)=>{this.changeRating(e)}}
                                emptySymbol={<img style={{width:'40px', height:'40px', margin:'5px'}} src={star_empty} className="icon" />}
                                fullSymbol={<img style={{width:'40px', height:'40px',margin:'5px'}} src={star_full} className="icon" />}
                            />
                        </div>

                    </div>
                    <div>
                        <Image
                            className='Detailposter'
                            src={'http://image.tmdb.org/t/p/w500/'+this.props.poster}
                            alt={'Movie Poster Unavailable'} rounded />
                    </div>

                </Modal.Body>
            </Modal>
        </div>;
    }

}

export default MovieDetails;
