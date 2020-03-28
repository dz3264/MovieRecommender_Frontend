import React from 'react';
import '../styles/Page.css';
import '../styles/Component.css'
import SearchBar from "../components/SearchBar";
import MovieThumb from "../components/MovieThumb";

class MoviesSearch extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            genreShow:"All",
            genre:"",
            sortShow:"Popularity",
            sort: "-popularity"
        };

        this.searchMovie = this.searchMovie.bind(this);
        this.selectGenre = this.selectGenre.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.searchInput = this.changeSort.bind(this);
    }

    selectGenre(gShow, g){
        this.setState({
            genreShow:gShow,
            genre:g
        })
    }

    changeSort(sortShow, sort){
        this.setState({
            sortShow:sortShow,
            sort: sort
        })
    }

    searchInput(){
        alert('change input')
    }

    searchMovie() {

        console.log('/api/movies?page=1&sort='+this.state.sort+'&genre='+this.state.genre);
        fetch("/api/movies?page=1&sort="+this.state.sort+"&genre="+this.state.genre)
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        isLoaded: true,
                        movies: result.data,
                        current_count: result.current_count,
                        total_count: result.total_count
                    });
                    //this.forceUpdate(()=>{console.log('update')})
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
        console.log('render');

        let moviesList;
        if (this.state.movies.length === 0){
            moviesList = <div> Search For Movies!</div>
        }
        else{
            moviesList = [];
            for (var i = 0; i < this.state.current_count; i++) {
                moviesList.push(<MovieThumb movie={this.state.movies[i]} />);
            }
        }
        console.log(moviesList);
        return <div className="Search Page">
            <SearchBar
                genreShow={this.state.genreShow}
                sortShow={this.state.sortShow}
                changeSort={this.changeSort}
                selectGenre={this.selectGenre}
                searchInput={this.searchInput}
                searchMovie={this.searchMovie}/>

            <div className='MovieList'>
                {moviesList}
            </div>


        </div>;
    }

}

export default MoviesSearch;
