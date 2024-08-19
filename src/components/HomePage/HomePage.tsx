import React from 'react';
import './HomePage.css'
import heroimage from "../assets/hero-image.png";
import rololaptop from "../assets/rolo laptop bag.jpeg";
import rolotote from "../assets/rolo tote bag.jpeg";
import rolounisex from "../assets/rolo unisex gateway bag.jpeg";
import roloblack from "../assets/rolo black bag.png";
import rolocut from "../assets/rolo cut bag.png";
import rolored from "../assets/rolo red bag.png";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <p className="rolo">Rolo</p>
                        <h1>"A Tapestry of Nepalese Heritage"</h1>
                        <p className="made">"Made In Nepal"</p>
                        <Link to='/shop'><button className="viewbtn">View Collection</button></Link>
                    </div>
                    <div className="hero-image">
                        <img src={heroimage} alt="Hero Image" />
                    </div>
                </div>
            </section>

            <section  className="categories">
                <div className="category_container">
                    <h2>Shop by Categories</h2>
                        <div className="categories-grid">
                            <div className="category-item">
                                <Link to='/shop'>
                                <button>
                                    <img src={rololaptop} alt="laptop bag" />
                                    <p>Rolo Laptop Bag </p>
                                </button>
                                </Link>
                            </div>
                            <div className="category-item">
                                <Link to='/shop'>
                                <button>
                                    <img src={rolotote} alt="ladies bag" />
                                    <p>Rolo Tote Bag </p>
                                </button>
                                </Link>
                            </div>
                             <div className="category-item">
                                 <Link to='/shop'>
                                <button>
                                    <img src={rolounisex} alt="college bag" />
                                    <p>Rolo Gateway Bag </p>
                                </button>
                                 </Link>
                             </div>
                            <div className="category-item">
                                <Link to='/shop'>
                                <button>
                                    <img src={roloblack} alt="large bag" />
                                    <p>Rolo Backpack </p>
                                </button>
                                </Link>
                            </div>
                        </div>
                </div>
            </section>
            <section className="best-sellers">
                <div className="best_container">
                    <h2>Best Selling Items</h2>
                        <div className="best-sellers-grid">
                            <div className="product-item">
                                <Link to='/shop'>
                                <button>
                                    <img src={rolocut} alt="Product 1" />
                                    <p>Rolo Green Bagpack</p>
                                    <p>Rs 4200</p>
                                </button>
                                </Link>
                            </div>
                            <div className="product-item">
                                <Link to='/shop'>
                                <button>
                                    <img src={rololaptop} alt="Product 4" />
                                    <p>Rolo Laptop Bag</p>
                                    <p>Rs 3300</p>
                                </button>
                                </Link>
                            </div>
                            <div className="product-item">
                                <Link to='/shop'>
                                <button>
                                    <img src={rolotote} alt="Product 2" />
                                    <p>Rolo Tote Bag</p>
                                    <p>Rs 3500</p>
                                </button>
                                </Link>
                            </div>
                            <div className="product-item">
                                <Link to='/shop'>
                                <button>
                                    <img src={rolored} alt="Product 3" />
                                    <p>Rolo Red Backpack</p>
                                    <p>Rs 4200</p>
                                </button>
                                </Link>
                            </div>
                        </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
