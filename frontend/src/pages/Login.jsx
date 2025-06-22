import React from 'react';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Pulse Login</h1>
        <p className="mb-6 text-center text-gray-600">Sign in with your email or SSO provider.</p>
        
        <div className="space-y-4">
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            Sign in with Email
          </button>
          
          <button className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors">
            Sign in with Google
          </button>
          
          <button className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
            Sign in with Slack
          </button>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Pulse - Burnout Detection Platform</p>
          <p className="mt-2">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}

export default Login; 