import React from 'react';
import '../styles/Page.css';
import '../styles/Component.css'
import SearchBar from "../components/SearchBar";
import MovieThumb from "../components/MovieThumb";
import PageNumbers from "../components/PageNumbers";

class MoviesSearch extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            genreShow:"All",
            genre:"",
            sortShow:"Popularity",
            sort: "-popularity",
            current_count: 0,
            total_count: 0,
            page_curr: 1,
            keyword:'',
        };

        this.searchMovie = this.searchMovie.bind(this);
        this.selectGenre = this.selectGenre.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.searchInput = this.changeSort.bind(this);
        this.changePage = this.changePage.bind(this);
        this.changeKeyword = this.changeKeyword.bind(this);

    }

    changePage(p){
        this.searchMovie(p);
    }

    changeKeyword(e){
        this.setState({
            keyword:e.target.value
        });
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

    searchMovie(p) {

        //console.log('/api/movies?limit=60&page='+this.state.page_curr+'&sort='+this.state.sort+'&genre='+this.state.genre);
        fetch('/api/movies?limit=60&page='+p+'&sort='+this.state.sort+'&genre='+this.state.genre+'&key='+this.state.keyword)
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

        let pageNum = this.state.current_count !== 0 ? Math.ceil(this.state.total_count/60) : 0 ;
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
        //console.log(moviesList);
        return <div className="Search Page">
            <SearchBar
                genreShow={this.state.genreShow}
                sortShow={this.state.sortShow}
                changeSort={this.changeSort}
                selectGenre={this.selectGenre}
                searchInput={this.searchInput}
                searchMovie={this.searchMovie}
                changeKeyword={this.changeKeyword}
                keyword={this.state.keyword}/>

            <div className='MovieList'>
                {moviesList}
            </div>
            <PageNumbers changePage={this.changePage} curr={this.state.page_curr} last={pageNum}/>

        </div>;
    }

}

export default MoviesSearch;
