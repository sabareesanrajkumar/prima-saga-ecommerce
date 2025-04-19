import React, { useState } from 'react';
import axios from 'axios';
import {
  Form,
  Button,
  Container,
  Alert,
  Row,
  Col,
  Card,
} from 'react-bootstrap';

const ContactUs = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  const firebaseUrl =
    'https://react-guided-project-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json';
  const handleChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(firebaseUrl, userData);
      setVariant('success');
      setMessage('Submitted successfully!');
      setUserData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error submitting:', error);
      setVariant('danger');
      setMessage('Submission failed. Please try again.');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow p-4">
            <h2 className="text-center mb-4">Contact Us</h2>
            {message && <Alert variant={variant}>{message}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
