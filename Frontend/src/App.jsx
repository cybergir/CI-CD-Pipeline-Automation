import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import PointOfSale from "./pages/Sales/PointOfSale.jsx";
import Products from "./pages/Products/Products.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from './pages/Auth/Login.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pos" element={<PointOfSale />} />
                <Route path="/products" element={<Products />} />
              </Routes>
            </Layout>
          }
        />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;