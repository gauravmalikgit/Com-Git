'use client';

import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hero Section */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered{' '}
            <span className="text-blue-600">Push Notification</span>{' '}
            Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create high-converting push notifications with AI that learns from your data. 
            Upload your campaign history and let our intelligent system generate personalized 
            notifications that drive engagement and revenue.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">🧠</div>
              <h3 className="font-semibold text-gray-900 mt-2">AI Learning</h3>
              <p className="text-sm text-gray-600">Learns from your data</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600">📈</div>
              <h3 className="font-semibold text-gray-900 mt-2">Higher CTR</h3>
              <p className="text-sm text-gray-600">Boost click-through rates</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600">⚡</div>
              <h3 className="font-semibold text-gray-900 mt-2">Fast Generation</h3>
              <p className="text-sm text-gray-600">Generate in seconds</p>
            </div>
          </div>
        </div>

        {/* Authentication Section */}
        <div className="w-full">
          {isLogin ? (
            <LoginForm 
              onSwitchToSignup={() => setIsLogin(false)}
            />
          ) : (
            <SignupForm 
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}