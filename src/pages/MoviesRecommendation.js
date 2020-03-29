import React from 'react';
import '../styles/Page.css';
import '../styles/Component.css'
import MovieThumb from "../components/MovieThumb";
import PageNumbers from "../components/PageNumbers";
import MovieDetails from "./MovieDetails";


class MoviesRecommendation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            movies: [],
            current_count: 0,
            total_count: 0,
            page_curr: 1,

        };

        this.changePage = this.changePage.bind(this);
        this.fetchMovie = this.fetchMovie.bind(this);
    }

    changePage(p){
        this.fetchMovie(p);
    }

    componentDidMount() {
        this.fetchMovie(1);
    }

    fetchMovie(p){
        console.log('/api/movies?page='+p+'&sort=-popularity&limit=60');
        fetch("/api/movies?page="+p+"&sort=-popularity&limit=60")
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        isLoaded: true,
                        movies: result.data,
                        current_count: result.current_count,
                        total_count: result.total_count,
                        page_curr: p
                    });

                    //this.forceUpdate();
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
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
        let moviesList = [];
        let pageNum = this.state.current_count !== 0 ? Math.ceil(this.state.total_count/60) : 0 ;

        for (var i = 0; i < this.state.current_count; i++) {
            moviesList.push(<MovieThumb movie={this.state.movies[i]} />);
        }


        return <div className="Recommendation Page">

            <div className="MovieList">
                {moviesList}
            </div>
            <PageNumbers changePage={this.changePage} curr={this.state.page_curr} last={pageNum}/>

        </div>;
    }

}

export default MoviesRecommendation;
