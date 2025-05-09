'use client';

import type React from 'react';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full p-8 bg-gray-900 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Something went wrong
              </h2>
              <p className="text-gray-300 mb-6">
                We apologize for the inconvenience. Please try refreshing the page or contact
                support if the problem persists.
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium transition-all duration-300"
                >
                  Refresh Page
                </button>
                <a
                  href="mailto:support@cogaineum.art"
                  className="block w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium text-center transition-all duration-300"
                >
                  Contact Support
                </a>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Error Details:</h3>
                  <pre className="text-xs text-gray-300 overflow-auto">
                    {this.state.error?.toString()}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
