import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/ProductCard/CartContext';
import HomePage from "./components/HomePage/HomePage.tsx";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp.tsx";
import AboutUs from "./components/AboutUs/AboutUs.tsx";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy.tsx";
import TermsConditions from "./components/Terms&Conditions/Terms&Conditions.tsx";
import ProductList from "./components/ProductCard/ProductList.tsx";
import ProductDetail from "./components/ProductCard/ProductDetail.tsx";
import Cart from "./components/ProductCard/Cart.tsx";
import AdminDashboard from "./components/admin/AdminDashboard.tsx";
import Category from "./components/admin/Category.tsx";
import AddCategory from "./components/admin/AddCategory.tsx";
import Order from "./components/admin/Order.tsx";
import User from "./components/admin/User.tsx";
import AddProduct from "./components/admin/AddProduct.tsx";
import EditProduct from "./components/admin/EditProduct.tsx";
import Product from "./components/admin/Product.tsx";
import Sidebar from "./components/admin/Sidebar.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

const App: React.FC = () => {
    return (
        <CartProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginSignUp />} />
                    <Route path="/admin/*" element={<AdminLayout />} />
                    <Route path="*" element={<MainLayout />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
};

const MainLayout: React.FC = () => (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ProductList />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/terms&conditions" element={<TermsConditions />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
    </>
);

const AdminLayout: React.FC = () => (
    <div className="admin-layout">
        <Sidebar />
        <div className="admin-content">
            <Routes>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/category" element={<Category />} />
                <Route path="/addcategory" element={<AddCategory />} />
                <Route path="/order" element={<Order />} />
                <Route path="/user" element={<User />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/product" element={<Product />} />
            </Routes>
        </div>
    </div>
);

export default App;



























