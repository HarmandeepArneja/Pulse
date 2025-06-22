import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import CompanyOverview from './pages/CompanyOverview';
import AnalyticsReport from './pages/AnalyticsReport';
import IntegrationHub from './pages/IntegrationHub';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/company" element={<CompanyOverview />} />
        <Route path="/analytics" element={<AnalyticsReport />} />
        <Route path="/integrations" element={<IntegrationHub />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App; 