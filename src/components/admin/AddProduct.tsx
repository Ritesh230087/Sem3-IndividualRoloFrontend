import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddProduct.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Category {
    id: number;
    categoryName: string;
}

const ProductForm: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productImage, setProductImage] = useState<File | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/category/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                toast.error('Error fetching categories.');
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async () => {
        if (!productName || !description || !price || !selectedCategory || !productImage) {
            toast.error('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('bagName', productName);
        formData.append('bagDescription', description);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('categoryId', selectedCategory);
        formData.append('bagImage', productImage);

        try {
            const response = await axios.post('http://localhost:8080/bag/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                toast.success('Product added successfully!');
                navigate('/admin/product');
            } else {
                toast.error('Product addition failed.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product.');
        }
    };

    return (
        <div className="product-form-container">
            <div className="product-form-group">
                <label htmlFor="productName">Product Name *</label>
                <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Biscuits"
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="productDescription">Product Description *</label>
                <textarea
                    id="productDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Your content goes here..."
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="sellingPrice">Selling Price *</label>
                <input
                    type="number"
                    id="sellingPrice"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="productImages">Product Images *</label>
                <input
                    type="file"
                    id="productImages"
                    onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="categories">Category *</label>
                <select
                    id="categories"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>

            <button type="button" className="product-form-button" onClick={handleSubmit}>
                Submit
            </button>

            <ToastContainer />
        </div>
    );
};

export default ProductForm;
