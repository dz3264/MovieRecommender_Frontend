import React from 'react';
import '../styles/Page.css';
import '../styles/Component.css'
import MovieThumb from "../components/MovieThumb";
import PageNumbers from "../components/PageNumbers";


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
            rec_movies: [],
            rec_count: 0,

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

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.user!== prevProps.user) {
            this.fetchMovie(1);
        }
    }


    fetchMovie(p){

        let user = this.props.user;
        if(user && user['userid']){
            //console.log('fetch here with user :',this.props.user);
            fetch("/api/rec/"+user['userid'])
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log('RECOMMENDATION: ',result);
                        this.setState({
                            rec_movies: result.rec_movies,
                            rec_count:  result.rec_movies.length
                        });

                        //this.forceUpdate();
                    },
                    (error) => {
                        console.log('error here FROM /api/rec/: ',error);
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                ).then( () =>{
                    console.log('this.state.rec_count:' ,this.state.rec_count);
                    fetch("/api/movies?page="+p+"&sort=-popularity&offset="+this.state.rec_count)
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
            })
        }
        else{
            //console.log('fetch without user');
            fetch("/api/movies?page="+p+"&sort=-popularity&limit=60")
                .then(res => res.json())
                .then(
                    (result) => {

                        this.setState({
                            isLoaded: true,
                            movies: result.data,
                            current_count: result.current_count,
                            total_count: result.total_count,
                            page_curr: p,
                            rec_movies: [],
                            rec_count: 0,

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

    }

    render() {
        //console.log('user in recommendation page',this.props.user);
        //console.log('recommendation count',this.state.rec_count);
        let moviesList = [];
        let pageNum = this.state.current_count !== 0 ? Math.ceil(this.state.total_count/60) : 0 ;
        for (var i = 0; i < this.state.rec_count; i++) {
            moviesList.push(<MovieThumb movie={this.state.rec_movies[i]} />);
        }
        for (var j = 0; j < this.state.current_count; j++) {
            moviesList.push(<MovieThumb movie={this.state.movies[j]} />);
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
