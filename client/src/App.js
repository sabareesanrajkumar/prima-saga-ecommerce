import './App.css';
import Header from './Components/Header/Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import ProductDetails from './Pages/ProductDetails';
import { CartProvider } from './Components/Cart/CartContext';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route
              path="/product-detail/:productId"
              element={<ProductDetails />}
            />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
