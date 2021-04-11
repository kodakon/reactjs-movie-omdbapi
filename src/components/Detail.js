import React, { Component, useState } from 'react'
import { Alert, InputGroup, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { render } from '@testing-library/react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import './Detail.css';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

const API_KEY = "faf7e5bb";


class Detail extends Component {
  constructor(props){
      super(props);
      this.state = {
        movie: [],
        title: 'narnia',
        newTitle: '',
        buttonClick: false,
        showPoster: false,
        poster: '',
        loading: false,
        item: 5,

      }
      this.inputChange = this.inputChange.bind(this);
      this.myscroll = React.createRef();
  }

  componentDidMount() {
        this.getMovie();
        this.infinteScroll();
  }

  getMovie = () => {
    axios.get(`http://www.omdbapi.com/?s=${this.state.title}&apikey=${API_KEY}`).then((e) => {
        this.setState({ 
            movie: e.data.Search,
        });
      });
  }

  infinteScroll = () => {
    const scroller = this.myscroll.current;
     
            if(scroller.clientHeight === scroller.scrollHeight - scroller.scrollTop) {
                this.loadMore();
                console.log("test");
            }
         
  }

  loadMore = () => {
      if( this.state.loading){
          return;
      }
      this.setState({ loading: true });
      setTimeout(() => {
          this.setState({ item: this.state.item + 5, loading: false});
      }, 2000);
      this.getMovie();
  }

  inputChange = e => {
    this.setState({ 
        newTitle: e.target.value
    });
      
  }

  updatesearch = () => {
    this.setState({ buttonClick: true })
  }

  handleShowPoster = (imdbID) => {
      axios.get(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`).then((e) => {
        this.setState({ 
            poster: e.data.Poster,
            showPoster: true
        })
        
      })
      
  }

  handleClosePoster = () => {
      this.setState({ showPoster: false })
  }

  componentDidUpdate() {

    if( this.state.buttonClick === true ){
        try {
            this.setState({ 
                title: this.state.newTitle, 
                buttonClick: false
            })
            this.getMovie();
        } catch(error) {
            console.log(error);
        }
        
    }

  }

  render() {
      const { Poster, showPoster} = this.state; 
   
      return(
       <div ref={this.myscroll} className="scroller">
            <div className="jumbotron text-center">
                <h1>List of movies</h1>
                
           
                    <input className="form-control" type="text" onChange={this.inputChange} />
                    <button onClick={() => this.updatesearch()}>
                    Search
                    </button>
                
            </div>

            <div className="row">
                {this.state.movie.slice(0, this.state.item).map((result, index) => (
                <div className="col-sm-3" key={index}>
                    <div className="container"> 
                        <div className="card mb-2" style={{width: 300}} >
                                <img className="card-img-top text-center " src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : result.Poster} alt={result.Title} style={{width: '300px', height: '400px'}} onClick={() => { this.handleShowPoster(result.imdbID) }}  />
                            <div className="card-body">
                                <h4 className="card-title">{result.Title}</h4>
                                <p className="card-text">{result.Year}</p>
                                <Link to={{pathname: `/detail/${result.imdbID}`}}>
                                <Button variant="primary"> Movie Detail  </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            {this.state.loading
                ? "" : ""
            }

            <div>

          

            <Modal show={showPoster} onHide={this.handleClosePoster}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img className="imgmodal" src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : this.state.poster} style={{width: '300px', height: '400px'}}  />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClosePoster}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClosePoster}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            </div>
       </div>
        

      )
  }
    
}

export default withRouter(Detail)
