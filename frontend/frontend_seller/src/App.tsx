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
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Landing/order-history" element={<OrderHistory />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/Landing/CustomerPage" element={<CustomerPage />} />
        <Route path="/Landing/QR" element={<QR />} />
        <Route path="/Landing/MessageAll" element={<MessageAll totalCustomers={1000} />} />
        <Route path="/Landing/ProductMangementPage" element={<ProductManagementPage />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path='/Signup' element={<SignupPage />} />
        <Route path='/' element={<FirstPage />} />
          
        
        <Route path="/Landing/Dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;