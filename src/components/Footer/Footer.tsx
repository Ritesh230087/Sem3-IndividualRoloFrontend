import React from 'react';
import './Footer.css';
import rolologo from '../assets/rolo black logo.png';
import instagram from '../assets/instagram.png'
import facebook from '../assets/facebook.png'
import whatsapp from '../assets/whatsapp.png'
import {Link} from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-links">
                    <Link to='/terms&conditions'>TERM & CONDITION</Link>
                    <Link to='/privacypolicy'>PRIVACY POLICY</Link>
                </div>
                <div className="footer-logo">
                    <Link to='/'><img src={rolologo} alt="Rolo" /></Link>
                    <p>&copy; 2024 Rolo Nepal. All Rights Reserved</p>
                </div>
                <div className="footer-social">
                    <span>FOLLOW US ON SOCIAL</span>
                    <a href="https://www.instagram.com/rolo_nepal/"><img src={instagram} alt="instagram" /></a>
                    <a href="https://www.facebook.com/profile.php?id=61554217543615"><img src={facebook} alt="Facebook" /></a>
                    <a href="https://web.whatsapp.com/"><img src={whatsapp} alt="whatsapp" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
