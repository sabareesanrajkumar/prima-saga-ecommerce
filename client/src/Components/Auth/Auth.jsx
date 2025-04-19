import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { AuthContext } from './AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [message, setMessage] = useState('');
  const authContext = useContext(AuthContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACwXu2-AU9rUeQT3n6rWGuqjalM2zWBWI`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACwXu2-AU9rUeQT3n6rWGuqjalM2zWBWI`;

    try {
      const response = await axios.post(
        url,
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      authContext.login(response.data.idToken);

      setMessage('Authentication successful!');
    } catch (error) {
      console.log(error);
      const errorMsg =
        error.response?.data?.error?.message || 'Authentication failed';
      setMessage(errorMsg);
    }
  };
  if (authContext.isLoggedIn) {
    return (
      <Container className="text-center my-5">
        <h3>You're Logged In!</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="mb-4 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
          {message && <Alert variant="info">{message}</Alert>}

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="authEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={emailInputRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="authPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                ref={passwordInputRef}
              />
            </Form.Group>

            <Button
              variant={isLogin ? 'success' : 'primary'}
              type="submit"
              className="w-100"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={() => setIsLogin((prev) => !prev)}>
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Login'}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Auth;
