import './App.css';
import Header from './Components/Header/Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';

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
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
