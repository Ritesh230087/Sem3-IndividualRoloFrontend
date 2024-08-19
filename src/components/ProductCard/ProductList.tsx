import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

interface Product {
    bagId: number;
    bagName: string;
    price: number;
    bagImage: string;
}

interface Category {
    id: number;
    categoryName: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/category/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchProducts = async (categoryId: number | null) => {
            try {
                const endpoint = categoryId
                    ? `http://localhost:8080/bag/by-category/${categoryId}`
                    : `http://localhost:8080/bag/list`;
                const response = await fetch(endpoint);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategories();
        fetchProducts(selectedCategory);

    }, [selectedCategory]);

    const handleProductClick = (productId: number) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="product-container">
            <div className="filter-section">
                <h4>Filter By:</h4>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={selectedCategory === null}
                        onChange={() => setSelectedCategory(null)}
                    />
                    <label>All Products</label>
                </div>
                {categories.map((category) => (
                    <div key={category.id}>
                        <input
                            type="radio"
                            name="category"
                            value={category.id}
                            checked={selectedCategory === category.id}
                            onChange={() => setSelectedCategory(category.id)}
                        />
                        <label>{category.categoryName}</label>
                    </div>
                ))}
            </div>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.bagId} className="product-card">
                            <button onClick={() => handleProductClick(product.bagId)}>
                                <img
                                    src={`data:image/png;base64,${product.bagImage}`}
                                    alt={product.bagName}
                                    onError={(e) => (e.currentTarget.src = 'fallback-image-url.png')}
                                />
                                <h3>{product.bagName}</h3>
                                <p className='price'>₹ {product.price}</p>
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No products available for this category.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
