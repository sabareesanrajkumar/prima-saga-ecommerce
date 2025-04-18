import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './NavBar.css';

import Cart from '../Cart/Cart';

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);
  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-logo">
            <h3>PRIMA SAGE</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/product">
                Product
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-primary" onClick={handleShow}>
            Cart
          </Button>
        </Container>
      </Navbar>
      <Cart show={showCart} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
