import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to error tracking service (e.g., Sentry)
    // Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Something went wrong
            </h2>
            
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              We're sorry, but something unexpected happened. Please try again.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs text-red-600 dark:bg-gray-800 dark:text-red-400">
                  {this.state.error.message}
                  {'\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button onClick={this.handleRetry} variant="default" className="w-full sm:w-auto">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button onClick={this.handleGoHome} variant="outline" className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error display component for API errors
interface ErrorDisplayProps {
  error: string | Error | null;
  title?: string;
  description?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'default' | 'destructive';
  className?: string;
}

export function ErrorDisplay({
  error,
  title = 'Something went wrong',
  description,
  onRetry,
  onDismiss,
  variant = 'destructive',
  className,
}: ErrorDisplayProps) {
  if (!error) return null;

  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <Alert variant={variant} className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        {title}
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-auto p-1 text-current hover:bg-transparent"
          >
            ×
          </Button>
        )}
      </AlertTitle>
      <AlertDescription className="mt-2">
        {description || errorMessage}
        {onRetry && (
          <div className="mt-3">
            <Button onClick={onRetry} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-3 w-3" />
              Try Again
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}

// Inline error component for form fields
interface InlineErrorProps {
  error: string | null;
  className?: string;
}

export function InlineError({ error, className }: InlineErrorProps) {
  if (!error) return null;

  return (
    <p className={`text-sm text-red-600 dark:text-red-400 ${className}`}>
      {error}
    </p>
  );
}

// Error toast hook
export function useErrorToast() {
  const showError = (error: string | Error, title = 'Error') => {
    const message = typeof error === 'string' ? error : error.message;
    
    // Using our toast system
    // toast({
    //   title,
    //   description: message,
    //   variant: 'destructive',
    // });
    
    console.error(title, message);
  };

  return { showError };
}

// Network error handler
export function handleApiError(error: any): string {
  // Network errors
  if (!navigator.onLine) {
    return 'Please check your internet connection and try again.';
  }

  // HTTP errors
  if (error.status) {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'You need to sign in to access this feature.';
      case 403:
        return 'You don\'t have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return `An error occurred (${error.status}). Please try again.`;
    }
  }

  // Generic errors
  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}

// Higher-order component for error handling
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorFallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
