import './App.css';
import Header from './Components/Header/Header';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Product from './Pages/Product';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
