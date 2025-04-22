const API_BASE_URL = 'http://localhost:5000/api';

// Helper: Get JWT token from localStorage
function getAuthToken() {
  return localStorage.getItem('token');
}

// Helper: Build headers with JSON content-type and optional Authorization
function buildHeaders(authRequired = false) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (authRequired) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

// Function to fetch products (requires auth)
export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`, {
    headers: buildHeaders(true),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

// Function to create a new product (requires auth)
export async function createProduct(productData) {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
}

// Function to fetch a specific product by ID (requires auth)
export async function fetchProductById(productId) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    headers: buildHeaders(true),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

// Function to update a product (requires auth)
export async function updateProduct(productId, productData) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'PUT',
    headers: buildHeaders(true),
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return response.json();
}

// Function to delete a product (requires auth)
export async function deleteProduct(productId) {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: buildHeaders(true),
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  // Assuming backend returns empty response or message
  return response.json();
}

// Function to fetch sales (requires auth)
export async function fetchSales() {
  const response = await fetch(`${API_BASE_URL}/sales`, {
    headers: buildHeaders(true),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch sales');
  }
  return response.json();
}

// Function to create a new sale (requires auth)
export async function createSale(saleData) {
  const response = await fetch(`${API_BASE_URL}/sales`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(saleData),
  });
  if (!response.ok) {
    throw new Error('Failed to create sale');
  }
  return response.json();
}

// Function to login a user (no auth required)
export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: buildHeaders(false),
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Invalid credentials');
  }
  const data = await response.json();
  // Save token to localStorage for future requests
  localStorage.setItem('token', data.access_token);
  return data;
}

// Function to register a new user (requires auth - admin only)
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to register user');
  }
  return response.json();
}

// Function to logout user (clear token)
export function logout() {
  localStorage.removeItem('token');
}
