import React, { useEffect, useState } from 'react';
import './Order.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Order {
    id: number;
    userId: number;
    bagId: number;
    totalAmount: number;
}

const OrderPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch('http://localhost:8080/orders/getAllOrders');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); // Directly parse JSON
                setOrders(data);
                toast.success('Orders loaded successfully!');
            } catch (error) {
                console.error('Failed to fetch order details:', error);
                toast.error('Error fetching orders.');
            }
        };

        fetchOrderDetails();
    }, []);

    const deleteOrder = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/orders/deleteOrder/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setOrders(orders.filter(order => order.id !== id));
            toast.success('Order deleted successfully!');
        } catch (error) {
            setError(`Failed to delete order: ${error.message}`);
            console.error('Failed to delete order:', error);
            toast.error('Error deleting order.');
        }
    };

    return (
        <div className="order-page">
            {error && <div className="error-message">{error}</div>}
            <table className="order-table">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Bag ID</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{order.bagId}</td>
                            <td>{order.totalAmount.toFixed(2)}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteOrder(order.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>No orders found</td>
                    </tr>
                )}
                </tbody>
            </table>

            <ToastContainer autoClose={5000} />
        </div>
    );
};

export default OrderPage;

