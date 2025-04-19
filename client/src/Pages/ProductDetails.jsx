import React from 'react';

import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const ProductDetails = () => {
  const { productId } = useParams();
  const productsArr = [
    {
      id: 1,
      title: 'Colors',
      price: 100,
      imageUrl:
        'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    },
    {
      id: 2,
      title: 'Black and white Colors',
      price: 50,
      imageUrl:
        'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    },
    {
      id: 3,
      title: 'Yellow and Black Colors',
      price: 70,
      imageUrl:
        'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    },
    {
      id: 4,
      title: 'Blue Colors',
      price: 100,
      imageUrl:
        'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    },
  ];

  const product = productsArr.find((p) => p.id === parseInt(productId));
  console.log(product);
  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <Container className="my-4">
      <h2>{product.title}</h2>
      <p>Price: INR {product.price}</p>

      <img
        className="d-block w-100"
        src={product.imageUrl}
        style={{ maxHeight: '400px', maxWidth: '350px', objectFit: 'cover' }}
      />

      <h4>Reviews</h4>
    </Container>
  );
};

export default ProductDetails;
