import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-xl font-bold text-blue-600">Pulse</Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/employee" className="text-gray-700 hover:text-blue-600 font-medium">Employee</Link>
            <Link to="/manager" className="text-gray-700 hover:text-blue-600 font-medium">Manager</Link>
            <Link to="/company" className="text-gray-700 hover:text-blue-600 font-medium">Company</Link>
            <Link to="/analytics" className="text-gray-700 hover:text-blue-600 font-medium">Analytics</Link>
            <Link to="/integrations" className="text-gray-700 hover:text-blue-600 font-medium">Integrations</Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Demo Mode</span>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 