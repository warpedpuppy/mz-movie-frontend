import Config from '../../config.js';
import React, {useState} from 'react'; 
import axios from 'axios';
import{RegistrationView} from '../registration-view/registration-view';
import { 
  Button, Container, Row, Col, Form, FormGroup, Label, Input
} from 'react-bootstrap';
import { Link } from "react-router-dom";


export function LoginView(props) {
  const [ username, setUsername ] = useState(''); 
  const [ password, setPassword ] = useState('');

  const [userError, setUserError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const isValid = formValidation();

    // Send a request to the server for authentication
    if (isValid) {
      // axios.post('https://radiant-journey-16913.herokuapp.com/login', {
      axios.post(`${Config.REMOTE_API}/login`, {  //REMOTE_API  LOCAL_API
        Username: username, /* test111 */
        Password: password  /* $test111 */   
      })
      .then (response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('user doesnt exist');
        alert('Invalid username or password');
      }); 
    };
  }

  const formValidation = () => {
    let userError = ''; 
    let isValid = true; 

    // LINE BELOW DOESNT WORK (USERNAME !== USERNAME || PASSWORD !== PASSWORD)
    // if (username !== username || password !== password ) {
    //   userError = 'invalid username or password';
    //   isValid = false;
    // }

    setUserError(userError); 
    return isValid;
  }

  return (
    <Form className='login-form'>
      <FormGroup controlId='FormBasicUsername'>
        <Form.Label>
          <Form.Control className='user-input' type='text' value={username} placeholder='Username' onChange = {e => 
          setUsername(e.target.value)} />
        </Form.Label>
      </FormGroup>
      
      <FormGroup controlId='FormBasicPassword'>
        <Form.Label>
          <Form.Control className='password-input' type='password' value={password} placeholder='Password' onChange = {e => 
          setPassword(e.target.value)} />
        </Form.Label>
      </FormGroup>
      
      <div style={{fontSize: 12, color: 'red'}}>{userError}</div>
      
      <FormGroup>
        <Button className='login-button' type='button' onClick={handleSubmit}>LOGIN</Button>
        <Link to = {`/register`}>
          <Button className='register-button' variant='link'>NEW USER</Button>
        </Link>
      </FormGroup>
    </Form>
  );
}
