import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddProduct.css';

interface Category {
    id: number;
    categoryName: string;
}

const EditProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        productName: '',
        productDescription: '',
        sellingPrice: '',
        quantity: '',
        productImages: [] as File[],
        categories: '', // Default category ID
    });
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchProductAndCategories = async () => {
            try {
                const [productResponse, categoriesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/bag/list/${id}`),
                    axios.get('http://localhost:8080/category/categories'),
                ]);

                const productData = productResponse.data;
                console.log('Product data fetched:', productData);

                setProduct({
                    productName: productData.bagName,
                    productDescription: productData.bagDescription,
                    sellingPrice: productData.price.toString(),
                    quantity: productData.quantity.toString(),
                    productImages: productData.productImages || [],
                    categories: productData.categoryId ? productData.categoryId.toString() : '',
                });

                console.log('Categories data fetched:', categoriesResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching product or categories:', error);
                toast.error('Error fetching product or categories.');
            }
        };

        fetchProductAndCategories();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [id]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                productImages: Array.from(e.target.files),
            }));
        }
    };
    const handleSubmit = async () => {
        // Validate fields
        if (!product.productName || !product.productDescription || !product.sellingPrice || !product.categories) {
            toast.error('Please fill in all required fields.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('bagName', product.productName);
            formData.append('bagDescription', product.productDescription);
            formData.append('price', product.sellingPrice);
            formData.append('quantity', product.quantity);
            formData.append('categoryId', product.categories);

            // Append all images
            product.productImages.forEach((file) => formData.append('bagImage', file));

            const response = await axios.put(`http://localhost:8080/bag/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Update response:', response); // Debugging line

            toast.success('Product updated successfully!');
            navigate('/admin/product'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating product:', error);
            if (error.response) {
                toast.error(`Server responded with an error: ${error.response.data}`);
            } else if (error.request) {
                toast.error('No response received from the server.');
            } else {
                toast.error(`Error in setting up the request: ${error.message}`);
            }
        }
    };


    return (
        <div className="product-form-container">
            <div className="product-form-group">
                <label htmlFor="productName">Product Name *</label>
                <input
                    type="text"
                    id="productName"
                    value={product.productName}
                    onChange={handleInputChange}
                    placeholder="e.g. Biscuits"
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="productDescription">Product Description *</label>
                <textarea
                    id="productDescription"
                    value={product.productDescription}
                    onChange={handleInputChange}
                    placeholder="Your content goes here..."
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="sellingPrice">Selling Price *</label>
                <input
                    type="number"
                    id="sellingPrice"
                    value={product.sellingPrice}
                    onChange={handleInputChange}
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    value={product.quantity}
                    onChange={handleInputChange}
                />
            </div>

            <div className="product-form-group">
                <label htmlFor="productImages">Product Images</label>
                <input
                    type="file"
                    id="productImages"
                    onChange={handleFileChange}
                    multiple
                />
                <div className="image-preview">
                    {product.productImages.map((file, index) => (
                        <img key={index} src={URL.createObjectURL(file)} alt={`Product Image ${index}`} />
                    ))}
                </div>
            </div>

            <div className="product-form-group">
                <label htmlFor="categories">Category *</label>
                <select
                    id="categories"
                    value={product.categories}
                    onChange={handleInputChange}
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id.toString()}>
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

export default EditProductForm;
