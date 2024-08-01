import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './components/CartProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
  <App />
  </CartProvider>
);
