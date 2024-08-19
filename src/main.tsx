import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import ReactModal from 'react-modal';

// Set the app element for ReactModal
ReactModal.setAppElement('#root');
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        <ToastContainer />
    </React.StrictMode>,
);
