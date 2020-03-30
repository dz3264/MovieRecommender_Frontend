import React from 'react';
import '../styles/Component.css';
import MovieThumb from "../components/MovieThumb";
import ListGroup from "react-bootstrap/ListGroup";
import star_empty from "../asset/star_empty.png";
import star_full from "../asset/star_full.png";
import Rating from "react-rating";
import MovieDetails from "../pages/MovieDetails";

class UserHistory extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            ratings: [],
            ratings_total: 0,
            rating_movies:[],
            historys: [],
            history_movies:[],
            showDetails: false,
        };
        this.fetchMovie = this.fetchMovie.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
    }

    fetchMovie(id,rating,t){
        fetch('/api/movie/'+id)
            .then(res => res.json())
            .then(
                (result) => {
                    if (rating !== null){
                        let rating_movies = this.state.rating_movies;
                        rating_movies.push({
                            rating:rating,
                            movie:result.data,
                            time:t});

                        this.setState({
                            rating_movies:rating_movies
                        });
                    }else{
                        let history_movies = this.state.history_movies;
                        history_movies.push({movie:result.data,time:t});

                        this.setState({
                            history_movies:history_movies
                        });
                    }

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

    fetchUserInfo(){

        //console.log('/api/movies?limit=60&page='+this.state.page_curr+'&sort='+this.state.sort+'&genre='+this.state.genre);
        fetch('/api/ratingby/'+this.props.user['userid'])
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        ratings_total:result.total_count,
                        ratings:result.data
                    });
                    console.log(result.data)
                },
                (error) => {
                    console.log('error here: ',error);
                    this.setState({
                        isLoaded: true,
                        error
                    });

                }
            ).then(()=>{
            for (var i = 0; i < this.state.ratings_total; i++){
                let rating = this.state.ratings[i];
                this.fetchMovie(rating['movieid'],rating['rating'],rating['timestamp'])
            }
        });
        fetch('/api/user/'+this.props.user['userid'])
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        historys:result.data.userhistory
                    });
                    console.log(result.data)
                },
                (error) => {
                    console.log('error here: ',error);
                    this.setState({
                        isLoaded: true,
                        error
                    });

                }
            ).then(()=>{

            for (var i = 0; i < Object.keys(this.state.historys).length; i++){
                let history = Object.keys(this.state.historys)[i];
                this.fetchMovie(history,null,this.state.historys[history])
            }
        })

    }

    componentDidMount() {
        this.fetchUserInfo();
    }



    render() {

        let user_ratings;
        if(this.state.ratings_total === 0){
            user_ratings = <div>You have not rate any movies.</div>
        }
        else{
            let user_ratings_details = [];
            for (var i = 0; i < this.state.rating_movies.length; i++) {
                let rating_movie = this.state.rating_movies[i];
                user_ratings_details.push(
                    <ListGroup.Item>
                        <div>{rating_movie.movie.title.split('(')[0]}</div>
                        <Rating
                            initialRating={rating_movie.rating}
                            fractions={2}
                            readonly
                            emptySymbol={<img style={{width:'20px', height:'20px', margin:'5px'}} src={star_empty} className="icon" />}
                            fullSymbol={<img style={{width:'20px', height:'20px',margin:'5px'}} src={star_full} className="icon" />}
                        />

                    </ListGroup.Item>);
            }
            user_ratings = <ListGroup className='scroll' variant="flush">
                {user_ratings_details}
            </ListGroup>
        }
        let user_history;
        if(this.props.user.userhistory == null || this.props.user.userhistory === {}){
            user_history = <div>Explore more movies!</div>
        }
        else{
            let user_history_details = [];
            for (var j = 0; j < this.state.history_movies.length; j++) {
                let history_movie = this.state.history_movies[j];
                console.log(history_movie.movie);
                user_history_details.push(
                    <ListGroup.Item>
                        <div>{history_movie.movie.title.split('(')[0]}</div>
                        <div>{history_movie.movie.genres}</div>
                        <div>{history_movie.movie.release_date}</div>
                    </ListGroup.Item>);
            }
            user_history = <ListGroup className='scroll' variant="flush">
                {user_history_details}
            </ListGroup>
        }

        return <div className='LoginForms'>
            <div className='ratingHis myHistory left_col'>
                <div className='myTitle'>Rating History</div>
                {user_ratings}
            </div>

            <div className='viewHis myHistory right_col'>
                <div className='myTitle'>Explore History</div>
                {user_history}
            </div>



        </div>

    }
}

 export default UserHistory;
