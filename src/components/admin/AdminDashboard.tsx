import React from 'react';
import './admindashboard.css';

const AdminDashboard: React.FC = () => {
    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <h1>Welcome to the Admin Dashboard</h1>
                <p>We are glad to have you here. From this dashboard, you can manage your site and access various features.</p>
            </header>

            <section className="dashboard-content">
                <h2>What You Can Do Here:</h2>
                <ul>
                    <li>Manage users and their permissions</li>
                    <li>Add, Update and Delete Product</li>
                    <li>Add, Update and Delete Category</li>
                    <li>View Order List</li>
                </ul>
            </section>
        </div>
    );
};

export default AdminDashboard;
