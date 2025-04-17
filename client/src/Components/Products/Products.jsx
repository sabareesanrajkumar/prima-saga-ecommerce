import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  },
];

const Products = () => {
  return (
    <Container fluid className="Product-Items">
      <Row>
        {productsArr.map((product, index) => (
          <Col key={index} className="product-card">
            <div className="product-item">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="product-image"
              />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
