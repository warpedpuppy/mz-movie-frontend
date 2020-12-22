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
    super(props);

  this.state = {
    username: '', 
    password: '', 
    email: '', 
    birthday: '', 
    favouriteMovies: []
    };
  }

  componentDidMount() {
    const getToken = localStorage.getItem('token');
    this.getUser(getToken);
  }

  getUser(token) {

    const user = localStorage.getItem('user');

    axios.get(`${Config.API_URL}/users/${user}`, { 
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(response => {
      this.setState({
        username: response.data.username,
        password: response.data.password,
        email: response.data.email,
        birthday: this.truncate(response.data.birthday),
        favouriteMovies: response.data.favouriteMovies
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  // UPDATE USER INFO ---------------------------------------------------------------

  handleUpdate = (e) => { 

    e.preventDefault();

    const user = localStorage.getItem('user'); 
    const token = localStorage.getItem('token'); 

    axios.put(`${Config.API_URL}/users/${user}`, {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      birthday: this.state.birthday
    },
    {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(response => {
      const data = response.data;
      console.log('response received', data);
      this.setState({
        username: data.username,
        password: data.password,
        email: data.email,
        birthday: this.truncate(data.birthday)
      })
      localStorage.setItem('user', data.username); //data.username
      // window.open('/profile', '_self'); 
      // alert('Saved changes');
    })
    .catch((e) => {
      console.log(e);
      console.log('Error changing user info');
    });
  };

  // DEREGISTER USER -----------------------------------------------------------------

  handleDeregistering = (e) => {

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`${Config.API_URL}/users/${user}`, {
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

    axios.delete(`${Config.API_URL}/users/${user}/movies/${movie.id}`, {
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

  setUsername(username) {
    this.setState({username})
  }

  setPassword(password) {
    this.setState({password})
  }

  setEmail(email) {
    this.setState({email})
  }

  setBirthday(birthday) {
    this.setState({birthday})
  }
  
  truncate (str) {
    return str.substring(0, str.indexOf("T"))
  }

  render() {

  //  const { username, password, email, birthday, favouriteMovies} = this.state;
   const {movies, getFavouriteMoviesDetails} = this.props;
   const {username, password, email, birthday, favouriteMovies} = this.state;


    console.log(favouriteMovies);

    return (

      <div className = 'profile-view'>
        <Container>
          <CardGroup>
            <Card>
              <h3>{username}</h3>
              <h5>{email}</h5>
              <Button className='delete-button' onClick={() => this.handleDeregistering()}>DELETE ACCOUNT</Button>
            </Card>

            <Card>
              <h3>Edit Profile</h3>
              <Form.Group>
                <Form.Control 
                  type='text' placeholder='Enter new username' name='username' 
                  value={username} onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='password' placeholder='Enter new password' name='password' 
                  value={password} onChange={(e) => this.setPassword(e.target.value)}  />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='email' placeholder='Enter new email' name='email' 
                  value={email} onChange={(e) => this.setEmail(e.target.value)}  />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type='date' placeholder='Enter new birthday' name='birthday' 
                  value={this.state.birthday} onChange={(e) => this.setBirthday(e.target.value)}  />
              </Form.Group> 
              
              <Button type='submit' className='login-button' onClick={this.handleUpdate}>UPDATE</Button>
            </Card>

            <Container>
              <Card>
                <h3>Favourite Movies</h3>
                {getFavouriteMoviesDetails(favouriteMovies).map((movie, index)=> {
                 
                 // LINE BELOW NOT WORKING 
                  // if (favouriteMovies.length === 0) return <p>There are no movies in your list.</p>;
                  
                  return (
                    <Card key={index} style={{width: '16rem'}}> 
                      <Card.Img key={movie.imagePath} variant='top' src={movie.imagePath} />
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