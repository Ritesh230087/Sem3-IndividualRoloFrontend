import React, { useContext, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { CartContext } from './CartContext';
import './Cart.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart: React.FC = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const [cartData, setCartData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCartItems = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:8080/cart/getByUserId/${userId}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const cartItemsData = await response.json();

                    const bagsWithDetails = await Promise.all(cartItemsData.map(async (item: any) => {
                        try {
                            const bagResponse = await fetch(`http://localhost:8080/bag/list/${item.bagId}`);
                            if (!bagResponse.ok) {
                                throw new Error('Failed to fetch bag details');
                            }
                            const bagData = await bagResponse.json();
                            return {
                                ...item,
                                bagEntity: bagData
                            };
                        } catch (error) {
                            console.error('Error fetching bag details:', error);
                            return item;
                        }
                    }));

                    setCartData(bagsWithDetails);
                } catch (error) {
                    setError('Failed to fetch cart items');
                    console.error('Failed to fetch cart items:', error);
                    toast.error('Failed to fetch cart items');
                }
            } else {
                setError('User ID not found');
                toast.error('User ID not found');
            }
        };

        fetchCartItems();
    }, []);

    const handleRemoveFromCart = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/cart/remove/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to remove item');
            }

            removeFromCart(id);
            setCartData(prevData => prevData.filter(item => item.id !== id));
            toast.success('Item removed from cart');
        } catch (error) {
            setError('Failed to remove item');
            console.error('Failed to remove item:', error);
            toast.error('Failed to remove item');
        }
    };

    const subtotal = cartData.reduce((sum, item) => {
        if (item.bagEntity && item.bagEntity.price) {
            return sum + (item.bagEntity.price * item.quantity);
        }
        return sum;
    }, 0);
    const total = subtotal;

    const handleCheckout = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User ID is not available');
            console.error('User ID is not available');
            toast.error('User ID is not available');
            return;
        }

        const payload = {
            userId: Number(userId),
            bags: cartData.map(item => ({
                bagId: item.bagId,
                quantity: item.quantity,
            })),
            totalAmount: total,
        };

        try {
            const response = await fetch('http://localhost:8080/orders/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Checkout successful:', data);

            setCartData([]);
            toast.success('Checkout successful');
        } catch (error) {
            setError('Error during checkout');
            console.error('Error during checkout:', error);
            toast.error('Error during checkout');
        }
    };

    return (
        <div className="cart-container">
            {error && <div className="error-message">{error}</div>}
            <table className="cart-table">
                <thead>
                <tr>
                    <th className="cart-th">Product</th>
                    <th className="cart-th">Title</th>
                    <th className="cart-th">Price</th>
                    <th className="cart-th">Quantity</th>
                    <th className="cart-th">Total</th>
                    <th className="cart-th">Remove</th>
                </tr>
                </thead>
                <tbody>
                {cartData.length > 0 ? (
                    cartData.map(item => (
                        <tr key={item.id}>
                            <td className="cart-product-image">
                                <img
                                    src={item.bagEntity?.bagImage ? `data:image/png;base64,${item.bagEntity.bagImage}` : 'default-image.png'}
                                    width={100}
                                    alt={item.bagEntity?.bagName || 'Product Image'}
                                />
                            </td>
                            <td className="cart-product-title">{item.bagEntity?.bagName}</td>
                            <td className="cart-product-price">₹ {item.bagEntity?.price}</td>
                            <td className="cart-product-quantity">
                                {item.quantity}
                            </td>
                            <td className="cart-product-total">₹ {(item.bagEntity?.price * item.quantity).toFixed(2)}</td>
                            <td className="cart-product-remove">
                                <FaTimes onClick={() => handleRemoveFromCart(item.id)} />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6}>Your cart is empty</td>
                    </tr>
                )}
                </tbody>
            </table>

            <div className="cart-summary">
                <div className="summary-info">
                    <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
                    <p><strong>Total: ₹ {total.toFixed(2)}</strong></p>
                    <p><strong>Cash On Delivery</strong></p>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
