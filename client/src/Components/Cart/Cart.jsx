import React, { useContext, useEffect } from 'react';

import { Offcanvas, Button } from 'react-bootstrap';
import { CartContext } from './CartContext';

const Cart = ({ show, handleClose }) => {
  const { cartElements, removeFromCart } = useContext(CartContext);

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
                  onClick={() => removeFromCart(item)}
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
