import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductEdit() {
  // Use react-router's useParams hook to get the product ID from the URL
  const { id } = useParams();
  const navigate = useNavigate(); // For redirection after update

  // State for form input fields
  const [product, setProduct] = useState({
    reference: '',
    description: '',
    quantite: '',
    prix: ''
  });

  // Fetch product details when component mounts
  useEffect(() => {
    axios.get(`http://localhost:8000/api/product/${id}`)
      .then(response => {
        setProduct(response.data); // Pre-fill form with product data
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Function to handle form submission for updating product data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/api/updateProduct/${id}`, product)
      .then(response => {
        console.log('Product updated successfully:', response.data);
        // Redirect to the products list or home page after update
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className="container">
      <h1>Modifier le produit</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="reference">Référence</label>
          <input
            type="text"
            name="reference"
            className="form-control"
            value={product.reference}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantite">Quantité</label>
          <input
            type="text"
            name="quantite"
            className="form-control"
            value={product.quantite}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="prix">Prix</label>
          <input
            type="text"
            name="prix"
            className="form-control"
            value={product.prix}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark btn-sm mt-4">Mettre à jour</button>
      </form>
    </div>
  );
}
