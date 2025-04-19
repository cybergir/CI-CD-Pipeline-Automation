import React from 'react';
import PropTypes from 'prop-types';

const ProductList = ({ products, onAddToCart }) => {
  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="product-list space-y-6">
      {Object.entries(productsByCategory).map(([category, items]) => (
        <div key={category} className="category-section">
          <h2 className="category-title text-xl font-bold mb-2">{category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map(product => (
              <button
                key={product.id}
                className="product-card p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => onAddToCart(product)}
              >
                <div className="product-name font-medium">{product.name}</div>
                <div className="product-price text-green-600">
                  ${product.price.toFixed(2)}
                </div>
                {product.stock && (
                  <div className="product-stock text-xs text-gray-500">
                    Stock: {product.stock}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductList;