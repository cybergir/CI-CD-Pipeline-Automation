import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import PointOfSale from './pages/Sales/PointOfSale.jsx';
import Products from './pages/Products/Products.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pos" element={<PointOfSale />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;