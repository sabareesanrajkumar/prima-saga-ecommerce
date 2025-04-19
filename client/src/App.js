import './App.css';
import Header from './Components/Header/Header';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import ProductDetails from './Pages/ProductDetails';
import Login from './Pages/Login';
import { CartProvider } from './Components/Cart/CartContext';

import Auth from './Components/Auth/Auth';
import Profile from './Components/Profile/Profile';
import { AuthContext } from './Components/Auth/AuthContext';
import { useContext } from 'react';

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {authContext.isLoggedIn && (
              <Route path="/Product" element={<Product />} />
            )}
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route
              path="/product-detail/:productId"
              element={<ProductDetails />}
            />

            {!authContext.isLoggedIn && (
              <Route path="/auth" element={<Auth />} />
            )}
            {authContext.isLoggedIn && (
              <Route path="/profile" element={<Profile />} />
            )}
            <Route
              path="*"
              element={
                <Navigate to={authContext.isLoggedIn ? '/profile' : '/auth'} />
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
