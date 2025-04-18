import React, { useState } from 'react';

import { Offcanvas, Button } from 'react-bootstrap';

const Cart = ({ show, handleClose }) => {
  const [cartElements, setCartElements] = useState([
    {
      id: 1,
      title: 'Colors',
      price: 100,
      imageUrl:
        'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      quantity: 2,
    },
    {
      id: 2,
      title: 'Black and white Colors',
      price: 50,
      imageUrl:
        'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      quantity: 3,
    },
    {
      id: 3,
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl:
        'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      quantity: 1,
    },
  ]);

  const removeFromCart = (id) => {
    setCartElements((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartElements.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartElements.map((item) => (
            <div key={item.id} className="mb-3 border-bottom pb-2">
              <strong>{item.title}</strong> <br />
              Qty: {item.quantity} <br />
              Price: ${item.price}
              <div className="mt-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
