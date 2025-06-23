import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import CompanyOverview from './pages/CompanyOverview';
import AnalyticsReport from './pages/AnalyticsReport';
import IntegrationHub from './pages/IntegrationHub';
import Navbar from './components/Navbar';

// Protected route wrapper component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !user) {
      navigate('/login');
    }
    
    // Check role if required
    if (requiredRole && user?.publicMetadata?.role !== requiredRole) {
      navigate('/dashboard');
    }
  }, [isLoaded, user, navigate, requiredRole]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return children;
};

function App() {
  const { user } = useUser();
  const isManager = user?.publicMetadata?.role === 'MANAGER';
  const isAdmin = user?.publicMetadata?.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-gray-50">
      <SignedIn>
        <Navbar />
      </SignedIn>
      
      <Routes>
        <Route path="/login" element={
          <SignedOut>
            <Login />
          </SignedOut>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            {isManager ? <Navigate to="/manager" /> : <EmployeeDashboard />}
          </ProtectedRoute>
        } />

        <Route path="/manager" element={
          <ProtectedRoute requiredRole="MANAGER">
            <ManagerDashboard />
          </ProtectedRoute>
        } />

        <Route path="/company" element={
          <ProtectedRoute requiredRole="ADMIN">
            <CompanyOverview />
          </ProtectedRoute>
        } />

        <Route path="/analytics" element={
          <ProtectedRoute requiredRole="MANAGER">
            <AnalyticsReport />
          </ProtectedRoute>
        } />

        <Route path="/integrations" element={
          <ProtectedRoute requiredRole="ADMIN">
            <IntegrationHub />
          </ProtectedRoute>
        } />

        {/* Default redirect */}
        <Route path="/" element={
          <SignedIn>
            <Navigate to="/dashboard" replace />
          </SignedIn>
        } />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;