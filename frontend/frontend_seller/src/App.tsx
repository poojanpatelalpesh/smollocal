import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
import Notification from './components/Notification';
import { ordersAPI } from './services/api';
import OrderNotificationProvider from './OrderNotificationProvider';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/Login" replace />;
};

// Public Route Component (redirects to landing if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/Landing" replace /> : <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - No Auth Required */}
      <Route path="/" element={<FirstPage />} />
      <Route path="/Price" element={<Price />} />
      
      {/* Auth Routes */}
      <Route path="/Login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/Signup" element={
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/Landing" element={
        <ProtectedRoute>
          <Layout>
            <Landing />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/Dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/order-history" element={
        <ProtectedRoute>
          <Layout>
            <OrderHistory />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/CustomerPage" element={
        <ProtectedRoute>
          <Layout>
            <CustomerPage />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/QR" element={
        <ProtectedRoute>
          <Layout>
            <QR />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/MessageAll" element={
        <ProtectedRoute>
          <Layout>
            <MessageAll />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/ProductMangementPage" element={
        <ProtectedRoute>
          <Layout>
            <ProductManagementPage />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrderNotificationProvider>
          <AppRoutes />
        </OrderNotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;