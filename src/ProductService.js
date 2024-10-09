import axios from 'axios';

// Define the base URL of your API
const apiUrl = 'http://localhost:8000/api/products'; 

// Function to get the list of products
const getProducts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to insert new product data
const insertData = async (data) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/addProduct', data);
    return response.data;
  } catch (error) {
    console.error('Error inserting product:', error);
    throw error;
  }
};

// Function to delete a product by ID
const deleteData = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/deleteProduct/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Function to get a product by ID
const getProductById = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Function to update a product by ID
const updateData = async (id, data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/updateProduct/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Export the functions so they can be used in your components
export {
  getProducts,
  insertData,
  deleteData,
  getProductById,
  updateData
};
