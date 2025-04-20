import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PointOfSale from "./pages/Sales/PointOfSale.jsx";
import Products from "./pages/Products/Products.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pos" element={<PointOfSale />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;