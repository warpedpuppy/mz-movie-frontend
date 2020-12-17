import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Container
} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 

export class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render () {

    const {movie} = this.props;

    if(!movie) return null; 

    return (

      <div className='director-view'>
        <Container>
          <div className='director-name'>{movie.director.name}</div>
          <div className='director-bio'>{movie.director.bio}</div>
          <div className='director-birth'>{movie.director.birth}</div>
          <div className='director-death'>{movie.director.death}</div>
        </Container>
        <div>
          <Link to = {`/movies/${movie.id}`}>
            <Button className='back-button' variant='link'>BACK</Button>
          </Link>
        </div>
      </div>
    );
  }
}