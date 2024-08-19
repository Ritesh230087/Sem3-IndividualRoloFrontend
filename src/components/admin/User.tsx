import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
    password: string;
    address: string;
}

const UserPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/user/list');
                setUsers(response.data);
                toast.success('Users loaded successfully!');
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Error fetching users.');
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId: number) => {
        try {
            await axios.delete(`http://localhost:8080/user/list/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
            toast.success('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user.');
        }
    };

    return (
        <div className="user-page">
            <table className="user-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.address}</td>
                        <td>
                            <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ToastContainer autoClose={5000} />
        </div>
    );
};

export default UserPage;
