import React from 'react';
import '../styles/Component.css';
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Rating from "react-rating";
import star_full from '../asset/star_full.png';
import star_empty from '../asset/star_empty.png';
import axios from "axios";


class MovieDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show : this.props.show,
            rating: 0,
        };

        this.changeRating = this.changeRating.bind(this);
    }

    changeRating(e){
        this.setState({
            rating:e
        });
        let user = JSON.parse(localStorage.getItem('user')) ;
        if (user){
            axios.post('/api/ratingby/'+user.userid,
                {
                    userid: user['userid'],
                    movieid: this.props.movie['movieid'],
                    rating: e,
                    timestamp: Date.now()
                },
                {withCredentials: true})
                .then(response => {
                    console.log("updatehistory",response.data)

                }).catch(error => {
                console.log("error: ", error)
            });
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.show!== prevProps.show) {
            this.setState({
                show:this.props.show
            })
        }
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
            ).then(()=>{
                let user = JSON.parse(localStorage.getItem('user')) ;
                if (user){

                    fetch("/api/ratingby/"+user['userid']+this.props.movie['movieid'])
                        .then(res => res.json())
                        .then(
                            (result) => {
                                if(result.data){
                                    console.log("Existing Rating");
                                    let userRating = result.data['rating'];
                                    this.setState({
                                        rating: userRating,
                                    });
                                    //console.log(result);
                                }
                            },
                            (error) => {
                                console.log('error here: ',error);

                            }
                        );
                    axios.post('/api/user/'+user.userid+'?movie='+this.props.movie['movieid'], {}, {withCredentials: true})
                        .then(response => {
                            console.log("updatehistory",response.data)

                        }).catch(error => {
                        console.log("error: ", error)
                    });

                }
        });
    }

    render() {
        console.log('show: ',this.state.show, this.props.show);
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

        return <div className='Moviedetails'>
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
                            <td>{this.props.details['vote_average']} / 10</td>
                        </tr>
                        <tr>
                            <td>User Ratings</td>
                            <td>{this.state.averageRating} / 5.0</td>
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
            </div>

    }

}

export default MovieDetails;
