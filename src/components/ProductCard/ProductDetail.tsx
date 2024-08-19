// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './ProductDetail.css';
// import { toast } from 'react-toastify'; // Import toast for notifications
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styling
//
// const ProductDetail: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const [product, setProduct] = useState<any>(null);
//     const [quantity, setQuantity] = useState(1);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8080/bag/list/${id}`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setProduct(data);
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//                 setError('Failed to load product');
//                 toast.error('Failed to load product'); // Show error toast
//             }
//         };
//
//         fetchProduct();
//     }, [id]);
//
//     const handleIncrease = () => {
//         if (product && quantity < product.availableQuantity) {
//             setQuantity(prev => prev + 1);
//         }
//     };
//
//     const handleDecrease = () => {
//         if (quantity > 1) {
//             setQuantity(prev => prev - 1);
//         }
//     };
//
//     const handleAddToCart = async () => {
//         const userId = localStorage.getItem('userId');
//         if (!userId) {
//             toast.info('Please log in to add products to your cart.'); // Show info toast
//             // Optionally redirect to login page
//             return;
//         }
//
//         const cartData = {
//             userId: parseInt(userId, 10),
//             bagId: product.bagId,
//             quantity,
//             totalAmount: quantity * product.price, // Ensure totalAmount is included
//         };
//
//         try {
//             const response = await fetch('http://localhost:8080/cart/add', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(cartData) // Use cartData here
//             });
//
//             if (response.ok) {
//                 toast.success('Product added to cart successfully'); // Show success toast
//             } else {
//                 toast.error('Failed to add product to cart'); // Show error toast
//             }
//         } catch (error) {
//             console.error('Error adding product to cart:', error);
//             toast.error('An error occurred while adding the product to the cart.'); // Show error toast
//         }
//     };
//
//     if (!product) {
//         return <p>Loading...</p>;
//     }
//
//     const isOutOfStock = product.availableQuantity === 0;
//
//     return (
//         <div className="product-detail-container">
//             <button className="back-button" onClick={() => window.history.back()}>Back</button>
//             <div className="product-detail">
//                 <div className="product-image">
//                     {product.bagImage ? (
//                         <img src={`data:image/png;base64,${product.bagImage}`} alt={product.bagName} />
//                     ) : (
//                         <p>No image available</p>
//                     )}
//                 </div>
//                 <div className="product-info">
//                     <h2 className="product-name">{product.bagName}</h2>
//                     <p className="product-price">₹{product.price}</p>
//                     <p className="product-description">Bag Description: {product.bagDescription}</p>
//                     <p className="quantity-left">Quantity left: {product.quantity}</p>
//                     <div className="quantity-controls">
//                         <button onClick={handleDecrease}>-</button>
//                         <span>{quantity}</span>
//                         <button onClick={handleIncrease}>+</button>
//                     </div>
//                     <button
//                         className={`add-to-cart ${isOutOfStock ? 'out-of-stock' : ''}`}
//                         onClick={handleAddToCart}
//                         disabled={isOutOfStock}
//                     >
//                         {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
//                     </button>
//                     <p className="total-amount">Total: ₹{quantity * product.price}</p>
//                     {quantity === product.availableQuantity && (
//                         <p className="stock-warning">No more quantity left</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProductDetail;
//
//
//
//












import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/bag/list/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product');
                toast.error('Failed to load product');
            }
        };

        fetchProduct();
    }, [id]);

    const handleIncrease = () => {
        if (product && quantity < product.quantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            toast.info('Please log in to add products to your cart.');
            return;
        }

        const cartData = {
            userId: parseInt(userId, 10),
            bagId: product.bagId,
            quantity,
            totalAmount: quantity * product.price,
        };

        try {
            const response = await fetch('http://localhost:8080/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartData)
            });

            if (response.ok) {
                // Decrease the available quantity after adding to cart
                setProduct(prevProduct => ({
                    ...prevProduct,
                    quantity: prevProduct.quantity - quantity
                }));
                setQuantity(1); // Reset quantity after adding to cart
                toast.success('Product added to cart successfully');
            } else {
                toast.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('An error occurred while adding the product to the cart.');
        }
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    const isOutOfStock = product.quantity === 0;
    const isQuantityValid = quantity < product.quantity;

    return (
        <div className="product-detail-container">
            <button className="back-button" onClick={() => window.history.back()}>Back</button>
            <div className="product-detail">
                <div className="product-image">
                    {product.bagImage ? (
                        <img src={`data:image/png;base64,${product.bagImage}`} alt={product.bagName} />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="product-info">
                    <h2 className="product-name">{product.bagName}</h2>
                    <p className="product-price">₹{product.price}</p>
                    <p className="product-description">Bag Description: {product.bagDescription}</p>
                    <p className="quantity-left">Quantity left: {product.quantity}</p>
                    <div className="quantity-controls">
                        <button
                            onClick={handleDecrease}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            onClick={handleIncrease}
                            disabled={!isQuantityValid}
                            style={{ cursor: isQuantityValid ? 'pointer' : 'no-drop' }}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className={`add-to-cart ${isOutOfStock ? 'out-of-stock' : ''}`}
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                    <p className="total-amount">Total: ₹{quantity * product.price}</p>
                    {quantity === product.availableQuantity && !isOutOfStock && (
                        <p className="stock-warning">No more quantity left</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
