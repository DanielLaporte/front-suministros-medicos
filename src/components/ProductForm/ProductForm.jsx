import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css';

const API_URL = "http://localhost:5005"; // Cambia esta URL por la dirección de tu servidor

function ProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Fetch la lista de productos desde el servidor cuando el componente se monta
    axios.get(`${API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { ...productData }; // Copiamos el estado actual

    if (editingProduct) {
      // Si estamos editando un producto, enviamos una solicitud PUT para actualizar el producto existente
      axios.put(`${API_URL}/api/products/${editingProduct._id}`, formData)
        .then((response) => {
          // Actualizamos la lista de productos con el producto actualizado
          setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) => {
              if (product._id === response.data._id) {
                return response.data;
              }
              return product;
            });
            return updatedProducts;
          });

          // Limpiamos el formulario y el estado de editingProduct
          setProductData({
            name: '',
            description: '',
            price: '',
            category: '',
            brand: '',
          });
          setEditingProduct(null);
        })
        .catch((error) => {
          console.error('Error al editar el producto:', error);
        });
    } else {
      // Si no estamos editando, enviamos una solicitud POST para crear un nuevo producto
      axios.post(`${API_URL}/api/products`, formData)
        .then((response) => {
          // Agregamos el nuevo producto a la lista de productos
          setProducts((prevProducts) => [...prevProducts, response.data]);

          // Limpiamos el formulario
          setProductData({
            name: '',
            description: '',
            price: '',
            category: '',
            brand: '',
          });
        })
        .catch((error) => {
          console.error('Error al crear el producto:', error);
        });
    }
  };

  const handleEdit = (product) => {
    // Establecemos el estado de editingProduct al editar un producto
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
    });
    setEditingProduct(product);
  };

  const handleDelete = (productId) => {
    // Enviamos una solicitud DELETE para eliminar el producto
    axios.delete(`${API_URL}/api/products/${productId}`)
      .then(() => {
        // Eliminamos el producto eliminado de la lista de productos
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      })
      .catch((error) => {
        console.error('Error al borrar el producto:', error);
      });
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del producto:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</button>
      </form>
      <h2>Lista de Productos</h2>
      <ul className="product-list">
      
        {products.map((product) => (
          <li key={product._id}>
            <span>{product.name}</span>
            <button onClick={() => handleEdit(product)} className="edit-button">Editar</button>
            <button onClick={() => handleDelete(product._id)} className="delete-button">Borrar</button>
             </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductForm;