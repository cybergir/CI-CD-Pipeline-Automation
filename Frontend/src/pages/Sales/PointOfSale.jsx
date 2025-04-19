import React, { useState } from 'react';
import ProductList from '../../components/pos/ProductList.jsx';
import Cart from '../../components/pos/Cart.jsx';
import PaymentPanel from '../../components/pos/PaymentPanel.jsx';
import useProducts from '../../hooks/useProducts.jsx';

const PointOfSale = () => {
  const [cart, setCart] = useState([]);
  const { products, loading, error } = useProducts();
  
  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };
  
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error}</div>;

  return (
    <div className="pos-container grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="product-section md:col-span-2">
        <ProductList products={products} onAddToCart={addToCart} />
      </div>
      <div className="cart-section">
        <Cart items={cart} onRemove={removeFromCart} />
        <PaymentPanel cart={cart} />
      </div>
    </div>
  );
};

export default PointOfSale;