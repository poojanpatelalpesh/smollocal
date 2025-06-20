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
import Price from './pages/Price';
function App() {
  return (
    <Router>
      <Routes>
        {/* ❌ No Layout for these routes */}
        <Route path="/Landing" element={<Landing />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/CustomerPage" element={<CustomerPage />} />
        <Route path="/QR" element={<QR />} />
        <Route path="/MessageAll" element={<MessageAll totalCustomers={1000} />} />
        <Route path="/ProductMangementPage" element={<ProductManagementPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Signup' element={<SignupPage />} />
        <Route path='/' element={<FirstPage />} />
        <Route path='/Price' element={<Price />} />
          
        
        <Route path="/Dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;