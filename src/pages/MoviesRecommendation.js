import React from 'react';
import '../styles/Page.css';
import '../styles/Component.css'
import MovieThumb from "../components/MovieThumb";


class MoviesRecommendation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            movies: [],
            current_count: 0,
            total_count: 0
        };
    }

    componentDidMount() {
        fetch("/api/movies?page=1&sort=-popularity")
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        isLoaded: true,
                        movies: result.data,
                        current_count: result.current_count,
                        total_count: result.total_count

                    });
                    this.forceUpdate();
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

        for (var i = 0; i < this.state.current_count; i++) {
            moviesList.push(<MovieThumb movie={this.state.movies[i]} />);
        }


        return <div className="Recommendation Page">

            <div className="MovieList">
                {moviesList}
            </div>

        </div>;
    }

}

export default MoviesRecommendation;
