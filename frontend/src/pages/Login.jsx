import React from 'react';
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome to Pulse</h1>
          <p className="text-gray-600">Monitor and improve team wellbeing</p>
        </div>

        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "w-full shadow-none p-0",
              formButtonPrimary: 
                "w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors",
              formFieldInput: 
                "w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              socialButtonsBlockButton: 
                "w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors mb-2",
              footerActionLink: 
                "text-blue-600 hover:text-blue-800"
            },
          }}
          redirectUrl="/dashboard"
          routing="path"
          path="/login"
        />
        
        <div className="mt-8 text-center">
          <div className="space-y-2 text-sm text-gray-500">
            <p>Secure authentication powered by Clerk</p>
            <p className="text-xs">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;