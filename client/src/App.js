import './App.css';
import Header from './Components/Header/Header';

import React, { Suspense, lazy } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Auth from './Components/Auth/Auth';
import Profile from './Components/Profile/Profile';
import { AuthContext } from './Components/Auth/AuthContext';
import { useContext } from 'react';

const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Product = lazy(() => import('./Pages/Product'));
const ContactUs = lazy(() => import('./Pages/ContactUs'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails'));

function App() {
  const authContext = useContext(AuthContext);
  return (
    <div className="App">
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

          {!authContext.isLoggedIn && <Route path="/auth" element={<Auth />} />}
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
    </div>
  );
}

export default App;
