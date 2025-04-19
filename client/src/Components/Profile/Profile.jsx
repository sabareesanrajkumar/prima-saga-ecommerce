import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { AuthContext } from '../Auth/AuthContext';

const Profile = () => {
  const passwordRef = useRef();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPassword = passwordRef.current.value;

    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyACwXu2-AU9rUeQT3n6rWGuqjalM2zWBWI`,
        {
          idToken: authContext.token,
          password: newPassword,
          returnSecureToken: true,
        }
      );
      setMessage('Password updated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to change password. Please try again.');
      setMessage('');
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4">User Profile</h3>
      <p className="text-muted text-center">Change your password below</p>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" required ref={passwordRef} />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Change Password
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
