import React from 'react';
import '../styles/Component.css';
import MovieDetails from "../pages/MovieDetails";
import Modal from "react-bootstrap/Modal";


class MovieThumb extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            movie : this.props.movie,
            show : false,
        };

        this.fetchPoster = this.fetchPoster.bind(this);
        this.setShow = this.setShow.bind(this);

    }

    setShow(s){
        console.log('show details');
        this.setState({show: s});
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
        console.log('show outside', this.state.showDetails);
        //let background = 'http://image.tmdb.org/t/p/w200/'+this.state.movie['background'];
        let background = 'http://image.tmdb.org/t/p/w200/'+this.state.poster;
        //console.log(this.props.movie);
        return <div>
            <div
            className="Moviethumb"
            style={{backgroundImage: `url(${background})`}}
            onClick={()=>this.setShow(true)}
        >

            <div className="MovieInfo"  onClick={()=>this.setShow(true)}>
                <div className="title">{this.props.movie['title'].split("(")[0]}</div>
                <div className="release_date">{this.props.movie['release_date']}</div>
            </div>

            {/*this.state.showDetails ?
                <MovieDetails
                    show={this.state.showDetails}
                    movie={this.props.movie}
                    details={this.state.tmdbDetails}
                    close={this.setShow}
                    poster={this.state.poster}/> : null*/}
        </div>;
            <div className="MovieDetails">
                <Modal
                    show={this.state.show}
                    onHide={() => {this.setShow(false)}
                    }
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                    size='xl'
                >
                    <Modal.Header closeButton>
                        <Modal.Title >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.movie['title'].split("(")[0]}
                        </Modal.Title>


                    </Modal.Header>
                    <Modal.Body>
                        <MovieDetails
                            show={this.state.showDetails}
                            movie={this.props.movie}
                            details={this.state.tmdbDetails}
                            close={this.setShow}
                            poster={this.state.poster}/>
                    </Modal.Body>
                </Modal>
            </div>;
        </div>
    }

}

export default MovieThumb;
