import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar-start">
            <div className="sidebar-header">
                <div className="profile-pic">A</div>
                <div className="profile-name">Admin</div>
                <div className="profile-role">Administrator</div>
            </div>
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                        <span role="img" aria-label="dashboard">🏠</span> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/product" className={({ isActive }) => isActive ? "active" : ""}>
                        <span role="img" aria-label="products">📦</span> Product List
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/category" className={({ isActive }) => isActive ? "active" : ""}>
                        <span role="img" aria-label="categories">📋</span> Category List
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/user" className={({ isActive }) => isActive ? "active" : ""}>
                        <span role="img" aria-label="users">👥</span> User List
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/order" className={({ isActive }) => isActive ? "active" : ""}>
                        <span role="img" aria-label="orders">🛒</span> Order List
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
