import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import OrderHistory from './pages/OrderHistory';
import Layout from './components/Layout';
import CustomerPage from './pages/CustomerPage';
import QR from './pages/QR';
import MessageAll from './pages/MessageAll';
import { ProductManagementPage } from './components/Product Management/ProductManagementPage';
import Landing from './pages/Landing';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SingupPage';
import FirstPage from './pages/FirstPage';
function App() {
  return (
    <Router>
      <Routes>
        {/* ❌ No Layout for these routes */}
        <Route path="/Login/Landing" element={<Landing />} />
        <Route path="/Signup/Landing" element={<Landing />} />
        <Route path="Login/Landing/order-history" element={<OrderHistory />} />
        <Route path="Signup/Landing/order-history" element={<OrderHistory />} />
        <Route path="Login/order-history" element={<OrderHistory />} />
        <Route path="Signup/order-history" element={<OrderHistory />} />
        <Route path="Login/Landing/CustomerPage" element={<CustomerPage />} />
        <Route path="Signup/Landing/CustomerPage" element={<CustomerPage />} />
        <Route path="Login/Landing/QR" element={<QR />} />
        <Route path="Signup/Landing/QR" element={<QR />} />
        <Route path="Login/Landing/MessageAll" element={<MessageAll totalCustomers={1000} />} />
        <Route path="Signup/Landing/MessageAll" element={<MessageAll totalCustomers={1000} />} />
        <Route path="Login/Landing/ProductMangementPage" element={<ProductManagementPage />} />
        <Route path="Signup/Landing/ProductMangementPage" element={<ProductManagementPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Signup' element={<SignupPage />} />
        <Route path='/' element={<FirstPage />} />
          
        
        <Route path="Login/Landing/Dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="Signup/Landing/Dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
      </Routes>
      
    </Router>
  );
}

export default App;