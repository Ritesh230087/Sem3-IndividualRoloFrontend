import React, { useState, useEffect } from "react";
import './Navbar.css';
import rolologo from '../../components/assets/rolo black logo.png';
import carticon from '../../components/assets/carticon.png';
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [menu, setMenu] = useState("home");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div>
            <header className="header">
                <div className="container header-container">
                    <div className="logo">
                        <img src={rolologo} alt="Rolo Logo" />
                    </div>
                    <nav>
                        <ul>
                            <li onClick={() => { setMenu("home") }}><Link to='/'>Home</Link> {menu === "home" ? <hr /> : <></>}</li>
                            <li onClick={() => { setMenu("shop") }}><Link to='/shop'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                            <li onClick={() => { setMenu("about") }}><Link to='/Aboutus'>AboutUs</Link>{menu === "about" ? <hr /> : <></>}</li>
                        </ul>
                    </nav>
                    <div className="cart-search">
                        <Link to='/cart'><img src={carticon} alt="Cart" /></Link>
                        <div className="cart-count">0</div>
                        {isLoggedIn ? (
                            <button className="HomeSign_in" onClick={handleSignOut}>Sign out</button>
                        ) : (
                            <Link to='/login'><button className="HomeSign_in">Sign in</button></Link>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
