import Config from '../../config.js';
import React, {useState} from 'react'; 
import axios from 'axios'; 
import PropTypes from 'prop-types'; 
import {
  Form, Button, Container, Row, Col, Card, CardGroup
} from 'react-bootstrap'; 
import {Link} from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor(props) {
    super();

  this.username = undefined;
  this.password = undefined;
  this.email = undefined;

  this.state = {
    user: null,
    username: '',
    Password: '',
    email: '',
    birthday: null,
    favouriteMovies: []
    };
  }

  componentDidMount() {
    
    const getToken = localStorage.getItem('token');
    this.getUser(getToken);
  }

  getUser(token) {

    const user = localStorage.getItem('user');

    axios.get(`${Config.REMOTE_API}/users/${user}`, { //REMOTE_API  LOCAL_API
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        birthday: response.data.birthday,
        favouriteMovies: response.data.favouriteMovies
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  // UPDATE USER INFO ---------------------------------------------------------------

  handleUpdate = (e) => {


    const user = localStorage.getItem('user'); 
    const token = localStorage.getItem('token'); 

    axios.put(`${Config.REMOTE_API}/users/${user}`, {
      username: this.username,
      password: this.password,
      email: this.email,
      birthday: this.birthday
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((response) => {
      const data = response.data;
      localStorage.setItem('user', data.Username);
      window.open('/users', '_self'); 
      console.log('successful update');
    })
    .catch((e) => {
      console.log(e);
    });
  };

  // DEREGISTER USER -----------------------------------------------------------------

  handleDeregistering = (e) => {

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`${Config.REMOTE_API}/users/${user}`, {
      headers: {Authorization: `Bearer ${token}`}, 
    })
    .then((response) => {
      const data = response.data;
      window.open('/', '_self'); 
      alert('Account deleted succesfully');
    })
    .catch((e) => {
      alert('error deregistering user');
    });

    this.setState({
      user: null
    });

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Remove movie from favourite movies -----------------------------------------------

  removeMovie(movie) {

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`${Config.REMOTE_API}/users/${user}/movies/${movie.id}`, {
      headers: {Authorization: `Bearer ${token}`}, 
    })
    .then((response) => {
      this.setState({
        favouriteMovies: response.data.favouriteMovies
      });
    })
    .catch(function (error) {
      console.log(error); 
    });
    console.log('movie removed from favourite movies')
  }

  setUsername(input) {
    this.username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.email = input; 
  }

  setBirthday(input) {
    this.birthday = input;
  }

  render() {

   const movies = this.props.movies;
   const user = this.state.username,
         favouriteMovies = this.state.favouriteMovies; 

    console.log(favouriteMovies);

    return (

      <div className = 'profile-view'>
        <Container>
          <CardGroup>
            <Card>
              <h3>{this.state.username}</h3>
              <h5>{this.state.email}</h5>
              <Button className='delete-button' onClick={() => this.handleDeregistering()}>DELETE ACCOUNT</Button>
            </Card>

            <Card>
              <h3>Edit Profile</h3>
              <Form.Group>
                <Form.Control 
                  type='text' placeholder='Enter new username' name='username' 
                  value={this.username} onChange={(e) => this.setUsername(e.target.vlaue)} />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='password' placeholder='Enter new password' name='password' 
                  value={this.password} onChange={(e) => this.setPassword(e.target.value)}  />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='email' placeholder='Enter new email' name='email' 
                  value={this.email} onChange={(e) => this.setEmail(e.target.value)}  />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='date' placeholder='Enter new birthday' name='birthday' 
                  value={this.birthday} onChange={(e) => this.setBirthday(e.target.value)}  />
              </Form.Group>

              <Button className='login-button' onClick={() => this.handleUpdate()}>UPDATE</Button>
            </Card>

            <Container>
              <Card>
                <h3>Favourite Movies</h3>
                {favouriteMovies.map((movie) => {
                 
                 // LINE BELOW NOT WORKING 
                  // if (favouriteMovies.length === 0) return <p>There are no movies in your list.</p>;
                  
                  return (
                    <Card key={movie.id} style={{width: '16rem'}}> 
                      <Card.Img variant='top' src={movie.imagePath} />
                      <Card.Body>
                        <Link to={`/movies/${movie.id}`}>
                          <Button className='login-button' variant='link'>MORE INFO</Button>
                        </Link>
                        <Button className='login-button' variant='link' onClick={() => this.removeMovie(movie)}>REMOVE</Button>
                      </Card.Body>
                    </Card>
                  )
                })}
              </Card>
            </Container> 
          </CardGroup>
        </Container>
      </div>
    )
  }


}