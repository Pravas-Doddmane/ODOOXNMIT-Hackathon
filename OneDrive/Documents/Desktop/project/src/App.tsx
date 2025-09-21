import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import ManufacturingOrders from './pages/ManufacturingOrders';
import WorkOrders from './pages/WorkOrders';
import BOMs from './pages/BOMs';
import WorkCenters from './pages/WorkCenters';
import StockManagement from './pages/StockManagement';
import Users from './pages/Users';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/register" 
        element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/forgot-password" 
        element={!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/reset-password" 
        element={!isAuthenticated ? <ResetPassword /> : <Navigate to="/" replace />} 
      />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/manufacturing-orders" element={
        <ProtectedRoute>
          <Layout>
            <ManufacturingOrders />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/work-orders" element={
        <ProtectedRoute>
          <Layout>
            <WorkOrders />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/boms" element={
        <ProtectedRoute>
          <Layout>
            <BOMs />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/work-centers" element={
        <ProtectedRoute>
          <Layout>
            <WorkCenters />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/stock" element={
        <ProtectedRoute>
          <Layout>
            <StockManagement />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/users" element={
        <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
          <Layout>
            <Users />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;