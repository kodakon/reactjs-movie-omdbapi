import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './DetailMovie.css';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Detail from './Detail';

const API_KEY = "faf7e5bb";

    class DetailMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            imdbID: this.props.match.params.imdbID,
            poster: '',
            title: '',
            year: '',
            plot: '',
            genre: ''
        }
    }

    componentDidMount() {
        axios.get(`http://www.omdbapi.com/?i=${this.state.imdbID}&apikey=${API_KEY}`).then((e) => {
            this.setState({
                poster: e.data.Poster,
                title: e.data.Title,
                year: e.data.Year,
                plot: e.data.Plot,
                genre: e.data.Genre
            })
        })
    }

    render(){
        const { Poster } = this.state; 
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                        <Card>
                            <Card.Header>
                                <h3>Book Catalog</h3>
                            </Card.Header>
                            <Card.Body>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <div className="divider">
                                            <img className="imgposter" src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : this.state.poster} alt={this.state.poster} style={{width: '300px', height: '400px'}} />
                                            </div>
                                        </div>
                                        <div className="col-sm-8">
                                            <form>
                                                <div className="form-group row">
                                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Title</label>
                                                    <div className="col-sm-10">
                                                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={this.state.title} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Year</label>
                                                    <div className="col-sm-10">
                                                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={this.state.year} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Genre</label>
                                                    <div className="col-sm-10">
                                                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={this.state.genre} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Plot</label>
                                                    <div className="col-sm-10">
                                                    <textarea type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue={this.state.plot} rows="5" />
                                                    </div>
                                                </div>
                                                
                                                
                                            </form>
                                            <Link to={{pathname: `/`}}>
                                                <Button variant="primary"> Go Back </Button>
                                            </Link>

                                        </div>
                                    </div>
                                   
                                </div>
                            </Card.Body>
                        </Card>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
    
}

export default withRouter(DetailMovie)
