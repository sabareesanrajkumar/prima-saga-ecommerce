import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button, Badge } from 'react-bootstrap';
import './NavBar.css';

import Cart from '../Cart/Cart';
import { CartContext } from '../Cart/CartContext';
import { AuthContext } from '../Auth/AuthContext';

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const { cartElements } = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const totalItems = cartElements.reduce((acc, item) => acc + item.quantity, 0);
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
              {authCtx.isLoggedIn && (
                <Nav.Link as={Link} to="/product">
                  Product
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contactus">
                Contact Us
              </Nav.Link>
              {!authCtx.isLoggedIn && <Nav.Link href="/auth">Login</Nav.Link>}
              {authCtx.isLoggedIn && (
                <>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Button variant="outline-danger" onClick={authCtx.logout}>
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {authCtx.isLoggedIn && (
            <Button variant="outline-primary" onClick={handleShow}>
              Cart
              {totalItems > 0 && (
                <Badge pill bg="danger" className="ms-2">
                  {totalItems}
                </Badge>
              )}
            </Button>
          )}
        </Container>
      </Navbar>
      <Cart show={showCart} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
