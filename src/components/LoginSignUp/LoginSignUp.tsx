import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginSignUp.css';
import signin from '../assets/signin.png';
import signup from '../assets/signup.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SigninSignup: React.FC = () => {
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [signUpData, setSignUpData] = useState({ username: '', email: '', fullName: '', address: '', password: '' });
    const [forgotPasswordData, setForgotPasswordData] = useState({ email: '', newPassword: '' });

    useEffect(() => {
        document.body.classList.add('loginbody');
        return () => {
            document.body.classList.remove('loginbody');
        };
    }, []);

    const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForgotPasswordData({ ...forgotPasswordData, [e.target.name]: e.target.value });
    };
    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login/authenticate', signInData);
            if (response.status === 200) {
                const { userId } = response.data; // Assuming role is included in the response data
                if (userId) {
                    localStorage.setItem('userId', userId);
                }

                if (signInData.email === 'admin@gmail.com' && signInData.password === 'Admin@123') {
                    window.location.href = '/admin/dashboard';
                } else {

                    toast.success('Login successful!', {
                        autoClose: 2000,
                    });

                    // Redirect to user home page after showing the toast
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                }
            }
        } catch (error) {
            toast.error('Invalid username or password', {
                autoClose: 2000, // Show error toast for 2 seconds
            });
        }
    };
    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/save', signUpData);
            if (response.status === 200) {
                toast.success('User registered successfully!');
                setIsSignUpMode(false); // Switch to sign-in mode after successful sign-up
            } else {
                toast.error('Error occurred during sign up');
            }
        } catch (error) {
            toast.error('Error occurred during sign up');
        }
    };

    const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Validate password requirements
            const { newPassword } = forgotPasswordData;
            const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRequirements.test(newPassword)) {
                toast.error('Password must be at least 8 characters with uppercase, lowercase, number, and special character');
                return;
            }

            const response = await axios.post('http://localhost:8080/password/change', forgotPasswordData);
            if (response.status === 200) {
                toast.success('Password changed successfully!');
                handleForgotPasswordClose();
            } else {
                toast.error('Error resetting password.');
            }
        } catch (error) {
            toast.error('Error occurred during password reset');
        }
    };

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
    };

    const handleForgotPasswordClick = () => {
        setIsForgotPasswordMode(true);
    };

    const handleForgotPasswordClose = () => {
        setIsForgotPasswordMode(false);
    };

    return (
        <div className={`logincontainer ${isSignUpMode ? 'sign-up-mode' : ''}`}>
            <div className="signin-signup">
                <form className="sign-in-form" onSubmit={handleSignInSubmit}>
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={signInData.email}
                            onChange={handleSignInChange}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signInData.password}
                            onChange={handleSignInChange}
                        />
                    </div>
                    <input type="submit" value="Login" className="btn" />
                    <p className="account-text">
                        Don't have an account?{' '}
                        <a href="#" onClick={handleSignUpClick}>
                            Sign up
                        </a>
                    </p>
                    <p className="forgot-password-text">
                        <a href="#" onClick={handleForgotPasswordClick}>
                            Forgot Password?
                        </a>
                    </p>
                </form>
                <form className="sign-up-form" onSubmit={handleSignUpSubmit}>
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={signUpData.username}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={signUpData.email}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={signUpData.fullName}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-home"></i>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={signUpData.address}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signUpData.password}
                            onChange={handleSignUpChange}
                        />
                    </div>
                    <input type="submit" value="Sign up" className="btn" />
                    <p className="account-text">
                        Already have an account?{' '}
                        <a href="#" onClick={handleSignInClick}>
                            Sign in
                        </a>
                    </p>
                </form>
            </div>
            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Member of Rolo Nepal?</h3>
                        <p>Rolo Nepal is a Nepali backpack brand which represents the tapestry of Nepalese heritage</p>
                        <button className="btn" onClick={handleSignInClick} id="sign-in-btn">
                            Sign in
                        </button>
                    </div>
                    <img src={signin} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>New to Rolo Nepal?</h3>
                        <p>Rolo Nepal is a Nepali backpack brand which represents the tapestry of Nepalese heritage</p>
                        <button className="btn" onClick={handleSignUpClick} id="sign-up-btn">
                            Sign up
                        </button>
                    </div>
                    <img src={signup} className="image" alt="" />
                </div>
            </div>
            <ToastContainer />
            <div className={`forgot-password-modal ${isForgotPasswordMode ? 'show' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={handleForgotPasswordClose}>&times;</span>
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleForgotPasswordSubmit}>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={forgotPasswordData.email}
                                onChange={handleForgotPasswordChange}
                            />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={forgotPasswordData.newPassword}
                                onChange={handleForgotPasswordChange}
                            />
                        </div>
                        <input type="submit" value="Reset Password" className="btn" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SigninSignup;



