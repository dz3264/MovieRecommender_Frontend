import React from 'react';
import '../styles/Component.css';
import MovieDetails from "../pages/MovieDetails";


class MovieThumb extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            movie : this.props.movie,
            showDetails: false,
        };

        this.fetchPoster = this.fetchPoster.bind(this);
        this.setShow = this.setShow.bind(this);

    }

    setShow(s){
        this.setState({showDetails: s});
    }

    componentDidMount() {
        this.fetchPoster();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.movie['tmdb'] !== prevProps.movie['tmdb']) {
            this.fetchPoster();
        }
    }

    fetchPoster() {
        fetch("https://api.themoviedb.org/3/movie/"+this.props.movie['tmdb']+"?api_key=822b4bb3eaeaa80e07a5966ed1da34ce")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        poster: result.poster_path,
                        tmdbDetails: result,
                    });
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
        //console.log(this.state.poster);

        //let background = 'http://image.tmdb.org/t/p/w200/'+this.state.movie['background'];
        let background = 'http://image.tmdb.org/t/p/w200/'+this.state.poster;
        //console.log(this.props.movie);
        return <div
            className="Moviethumb"
            style={{backgroundImage: `url(${background})`}}
            onClick={()=>this.setShow(true)} >

            <div className="MovieInfo" >
                <div className="title">{this.props.movie['title'].split("(")[0]}</div>
                <div className="release_date">{this.props.movie['release_date']}</div>
            </div>
            {this.state.showDetails ?
                <MovieDetails
                movie={this.props.movie}
                details={this.state.tmdbDetails}
                poster={this.state.poster}/> : null}
        </div>;
    }

}

export default MovieThumb;
