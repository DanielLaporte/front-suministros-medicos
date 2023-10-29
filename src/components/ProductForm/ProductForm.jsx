import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css';

const API_URL = "http://localhost:5005";

function ProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    promotional: false,
    image: null, 
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      image: file,
    });
  };

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
      [name]: name === 'promotional' ? value === 'true' : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('brand', productData.brand);
    formData.append('promotional', productData.promotional);
    formData.append('image', productData.image);

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
            promotional: false,
            image: null,
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
            promotional: false,
            image: null,
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
      promotional: product.promotional,
      image: product.image,
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
    <div className="form-container text-center">
      <div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Nombre del producto:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <textarea
              name="description"
              className="form-control"
              value={productData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Marca:</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              value={productData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Categoría:</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={productData.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Promociones:</label>
            <select
              name="promotional"
              className="form-control"
              value={productData.promotional ? 'true' : 'false'}
              onChange={handleChange}
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Imagen:</label>
            <input
              type="file"
              name="image"  
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
          </button>
          
        </form>
        <h2>Lista de Productos</h2>
        <ul className="list-group">
          {products.map((product) => (
            <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
              {product.name}
              <div>
                <button onClick={() => handleEdit(product)} className="btn btn-info me-2 rounded-button">Editar</button>
                <button onClick={() => handleDelete(product._id)} className="btn btn-danger rounded-button">Borrar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductForm;
