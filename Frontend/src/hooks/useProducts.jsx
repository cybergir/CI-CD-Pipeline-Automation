import { useState, useEffect } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with actual API call
    setTimeout(() => {
      setProducts([
        { id: 1, name: "Sample Product", price: 9.99 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return { products, loading, error };
}