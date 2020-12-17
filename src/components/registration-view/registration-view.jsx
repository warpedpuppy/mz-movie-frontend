import Config from '../../config.js';
import React, {useState} from 'react'; 
import axios from 'axios';
import { 
  Container, Row, Col, Form, FormGroup, Label, Input, Button
} from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(username, password, email, birthday);
    const isValid = formValidation();
    // props.onLoggedIn(username);  // Why do I need this? Works fine without it

    if(isValid) {     
      axios.post(`${Config.REMOTE_API}/users`, {  //REMOTE_API  LOCAL_API
        username: username,
        Password: password,
        email: email,
        birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration succesful!');
        window.open('/', '_self'); // '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering user')
      });
    };
  } 

  const formValidation = () => {
    let usernameError = '';
    let passwordError = ''; 
    let emailError = ''; 
      
    let isValid = true; 

    if (username.length < 5) {
      usernameError = 'Username must be at least 5 characters';
      isValid = false;
    }

    if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters'; 
      isValid = false; 
    }

    if (!email.includes('.') && !email.includes('@')) {
      emailError = 'email invalid'
      isValid = false;
    }

    setUsernameError(usernameError); 
    setPasswordError(passwordError); 
    setEmailError(emailError);
    return isValid;
  }
  

  return (
    <Form className='login-form'>
      
      <FormGroup>
        <Form.Label>
          <Form.Control type='text' value={username} placeholder='Username' onChange = {e => 
          setUsername(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <div style={{fontSize: 12, color: 'red'}}>{usernameError}</div>
      
      <FormGroup>
        <Form.Label>
          <Form.Control type='password' value={password} placeholder='Password' onChange = {e => 
          setPassword(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <div style={{fontSize: 12, color: 'red'}}>{passwordError}</div>
      
      <FormGroup>
        <Form.Label>
          <Form.Control type='email' value={email} placeholder='Email' onChange = {e => 
          setEmail(e.target.value)} />
        </Form.Label>
      </FormGroup>
      <div style={{fontSize: 12, color: 'red'}}>{emailError}</div>
      
      <FormGroup>
        <Form.Label>
          <Form.Control type='date' value={birthday} placeholder='Birthday' onChange = {e => 
          setBirthday(e.target.value)} />
        </Form.Label>
      </FormGroup>
      
      <FormGroup>
        <Button className='login-button' type='button' onClick={handleSubmit}>REGISTER</Button>
      </FormGroup>
    </Form>
  );
}