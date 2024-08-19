// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Product.css';
// import { Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
//
// interface Product {
//     id: number;
//     image: string;
//     name: string;
//     price: number;
//     categoryId: number | null;
//     quantity: number;
// }
//
// interface Category {
//     id: number;
//     categoryName: string;
// }
//
// const ProductPage: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);
//     const [categories, setCategories] = useState<Category[]>([]);
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/category/categories');
//                 console.log('Fetched categories:', response.data);
//
//                 if (Array.isArray(response.data)) {
//                     const categoryData = response.data.map((category: any) => ({
//                         id: category.id,
//                         categoryName: category.categoryName,
//                     }));
//                     setCategories(categoryData);
//                 } else {
//                     console.error('Error: Categories data is not an array:', response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 toast.error('Error fetching categories.');
//             }
//         };
//
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/bag/list');
//                 console.log('Fetched products response:', response.data);
//
//                 if (Array.isArray(response.data)) {
//                     const fetchedProducts = response.data.map((product: any) => ({
//                         id: product.bagId,
//                         image: product.bagImage || '',
//                         name: product.bagName,
//                         price: parseFloat(product.price), // Ensure price is a number
//                         categoryId: product.categoryId !== undefined ? Number(product.categoryId) : null, // Ensure categoryId is a number
//                         quantity: product.quantity,
//                     }));
//
//                     console.log('Fetched products:', fetchedProducts);
//                     setProducts(fetchedProducts);
//                 } else {
//                     console.error('Error: Expected an array but received:', response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//                 toast.error('Error fetching products.');
//             }
//         };
//
//         fetchCategories().then(fetchProducts);
//     }, []);
//
//     const handleDeleteProduct = async (id: number) => {
//         try {
//             if (id === undefined || id === null || isNaN(id)) {
//                 console.error('Error: Invalid product ID:', id);
//                 return;
//             }
//             await axios.delete(`http://localhost:8080/bag/delete/${id}`);
//             setProducts(products.filter(product => product.id !== id));
//             toast.success('Product deleted successfully!');
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             toast.error('Error deleting product.');
//         }
//     };
//
//     return (
//         <div className="product-page">
//             <Link to='/admin/addproduct'>
//                 <button className="add-product-btn">Add Product</button>
//             </Link>
//             <table className="product-table">
//                 <thead>
//                 <tr>
//                     <th>Image</th>
//                     <th>Product Name</th>
//                     <th>Price</th>
//                     <th>Category</th>
//                     <th>Quantity</th>
//                     <th>Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {products.map((product) => {
//                     const category = categories.find(cat => cat.id === product.categoryId);
//
//                     return (
//                         <tr key={product.id}>
//                             <td>
//                                 <img src={`data:image/png;base64,${product.image}`} width={100} alt={product.name} />
//                             </td>
//                             <td>{product.name}</td>
//                             <td>{product.price.toFixed(2)}</td>
//                             <td>
//                                 {category ? category.categoryName : 'Unknown'}
//                             </td>
//                             <td>{product.quantity}</td>
//                             <td>
//                                 <Link to={`/admin/edit-product/${product.id}`}>
//                                     <button className="edit-btn">Edit</button>
//                                 </Link>
//                                 <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     );
//                 })}
//                 </tbody>
//             </table>
//
//             <ToastContainer />
//         </div>
//     );
// };
//
// export default ProductPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Product.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
}

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/bag/list');
                console.log('Fetched products response:', response.data);

                if (Array.isArray(response.data)) {
                    const fetchedProducts = response.data.map((product: any) => ({
                        id: product.bagId,
                        image: product.bagImage || '',
                        name: product.bagName,
                        price: parseFloat(product.price), // Ensure price is a number
                        quantity: product.quantity,
                    }));

                    console.log('Fetched products:', fetchedProducts);
                    setProducts(fetchedProducts);
                } else {
                    console.error('Error: Expected an array but received:', response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Error fetching products.');
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (id: number) => {
        try {
            if (id === undefined || id === null || isNaN(id)) {
                console.error('Error: Invalid product ID:', id);
                return;
            }
            await axios.delete(`http://localhost:8080/bag/delete/${id}`);
            setProducts(products.filter(product => product.id !== id));
            toast.success('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Error deleting product.');
        }
    };

    return (
        <div className="product-page">
            <Link to='/admin/addproduct'>
                <button className="add-product-btn">Add Product</button>
            </Link>
            <table className="product-table">
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <img src={`data:image/png;base64,${product.image}`} width={100} alt={product.name} />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <Link to={`/admin/edit-product/${product.id}`}>
                                <button className="edit-btn">Edit</button>
                            </Link>
                            <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ToastContainer />
        </div>
    );
};

export default ProductPage;
