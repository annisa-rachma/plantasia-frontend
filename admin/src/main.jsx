import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import store from './store/index.js'
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
    <App />
    <ToastContainer />
    </Provider>
  // </React.StrictMode>,
)
