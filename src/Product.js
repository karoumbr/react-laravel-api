import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, insertData, deleteData } from './ProductService';
import axios from 'axios';

export default function Product() {
     // State for form input fields
  const [product, setProduct] = useState({
    reference: '',
    description: '',
    quantite: '',
    prix: ''
  });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        // Appel à l'API Laravel pour récupérer les articles
        axios.get('http://localhost:8000/api/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false); // Arrête le chargement une fois les données récupérées
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de la récupération des produits!", error);
                setLoading(false); // Arrête le chargement même en cas d'erreur
            });
    }, []);

// Function to handle form input changes
const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  // Function to insert data (similar to insertData in Angular)
  const insertProductData = (e) => {
    e.preventDefault();
    insertData(product).then(() => {
      // Refresh product list after insertion
      getProductData();
    });
  };
    // Function to fetch product data
    const getProductData = () => {
        getProducts().then((res) => {
          setProducts(res);
        });
      };
        // Function to delete product data
  const deleteProductData = (id) => {
    deleteData(id).then(() => {
      // Refresh product list after deletion
      getProductData();
    });
  };

    return (
        <div>

    <div class="container">
  
      <div class="row">
          <div class="col mt-5 mb-5 ">
          <div class="col-md-8 mx-auto">
    {/* Form for inserting new product */}
      <form onSubmit={insertProductData}>
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

        <button type="submit" className="btn btn-dark btn-sm mt-4">Valider</button>
      </form>

      
                 
                  <hr/>
            <h1>Liste des produits</h1>
            
            {loading ? (
                <p>Chargement des produits...</p>
            ) : (
               

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Référence</th>
                            <th scope="col">Description</th>
                            <th scope="col">Quantité</th>
                            <th scope="col">Prix</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product.id}>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.reference}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantite}</td>
                                    <td>{product.prix}</td>
                                    <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProductData(product.id)}
                >
                  Supprimer
                </button>
                 <Link to={`/edit/${product.id}`}>
                  <button className="btn btn-warning btn-sm mx-2">
                    Mise à jour
                  </button>
                </Link> 
              </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Aucun produit disponible</td>
                            </tr>
                        )}
                    </tbody>
                </table>
              
            )}
        </div>
        </div></div>
                </div>
            </div>
    );
}
