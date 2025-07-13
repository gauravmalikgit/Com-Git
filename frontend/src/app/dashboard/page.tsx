'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PNGeneratorForm } from '@/components/generator/PNGeneratorForm';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'generate' | 'upload' | 'analytics'>('generate');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">PN Generator</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('generate')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === 'generate'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Generate PN
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Upload Data
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
              activeTab === 'analytics'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            Analytics
          </button>
        </nav>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'generate' && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Generate Push Notifications</CardTitle>
                  <CardDescription>
                    Create AI-powered push notifications tailored to your audience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PNGeneratorForm />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upload Campaign Data</CardTitle>
                  <CardDescription>
                    Upload your past campaign data to improve AI recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload CSV/Excel File</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Button variant="outline">
                      Choose File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>
                    View your campaign performance and AI learning insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900">Average CTR</h4>
                      <p className="text-2xl font-bold text-blue-700">2.45%</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900">Total Revenue</h4>
                      <p className="text-2xl font-bold text-green-700">₹1,24,500</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-900">Campaigns</h4>
                      <p className="text-2xl font-bold text-purple-700">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}