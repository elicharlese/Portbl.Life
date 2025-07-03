import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export function LoadingSkeleton({ className, variant = 'rectangular' }: LoadingSkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-full',
    rectangular: 'h-20 w-full',
    circular: 'h-12 w-12 rounded-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        variantClasses[variant],
        variant === 'text' && 'rounded',
        variant === 'rectangular' && 'rounded-md',
        className
      )}
    />
  );
}

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <LoadingSkeleton className="aspect-square w-full" />
      <div className="space-y-2">
        <LoadingSkeleton variant="text" className="h-4 w-3/4" />
        <LoadingSkeleton variant="text" className="h-4 w-1/2" />
        <LoadingSkeleton variant="text" className="h-5 w-1/4" />
      </div>
    </div>
  );
}

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

export function ProductGridSkeleton({ count = 8, className }: ProductGridSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

interface ProductDetailSkeletonProps {
  className?: string;
}

export function ProductDetailSkeleton({ className }: ProductDetailSkeletonProps) {
  return (
    <div className={cn('container mx-auto px-4 py-8', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Gallery Skeleton */}
        <div className="space-y-4">
          <LoadingSkeleton className="aspect-square w-full" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <LoadingSkeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <div className="space-y-4">
            <LoadingSkeleton variant="text" className="h-8 w-3/4" />
            <LoadingSkeleton variant="text" className="h-6 w-1/4" />
            <LoadingSkeleton variant="text" className="h-4 w-1/3" />
          </div>

          <div className="space-y-3">
            <LoadingSkeleton variant="text" className="h-4 w-full" />
            <LoadingSkeleton variant="text" className="h-4 w-full" />
            <LoadingSkeleton variant="text" className="h-4 w-2/3" />
          </div>

          <div className="space-y-4">
            <LoadingSkeleton variant="text" className="h-5 w-20" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <LoadingSkeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <LoadingSkeleton className="h-12 w-full" />
            <LoadingSkeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-16 space-y-6">
        <div className="flex space-x-6 border-b">
          {Array.from({ length: 3 }).map((_, i) => (
            <LoadingSkeleton key={i} variant="text" className="h-6 w-20" />
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <LoadingSkeleton key={i} variant="text" className="h-4 w-full" />
          ))}
        </div>
      </div>

      {/* Suggested Products Skeleton */}
      <div className="space-y-6">
        <LoadingSkeleton variant="text" className="h-7 w-48" />
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  );
}

interface OrderSkeletonProps {
  className?: string;
}

export function OrderSkeleton({ className }: OrderSkeletonProps) {
  return (
    <div className={cn('space-y-4 rounded-lg border p-4', className)}>
      <div className="flex items-center justify-between">
        <LoadingSkeleton variant="text" className="h-5 w-32" />
        <LoadingSkeleton variant="text" className="h-4 w-20" />
      </div>
      <div className="space-y-2">
        <LoadingSkeleton variant="text" className="h-4 w-48" />
        <LoadingSkeleton variant="text" className="h-4 w-36" />
      </div>
      <div className="flex items-center space-x-4">
        <LoadingSkeleton className="h-16 w-16" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton variant="text" className="h-4 w-3/4" />
          <LoadingSkeleton variant="text" className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

interface ReviewSkeletonProps {
  className?: string;
}

export function ReviewSkeleton({ className }: ReviewSkeletonProps) {
  return (
    <div className={cn('space-y-3 border-b pb-4', className)}>
      <div className="flex items-center space-x-3">
        <LoadingSkeleton variant="circular" className="h-10 w-10" />
        <div className="space-y-1">
          <LoadingSkeleton variant="text" className="h-4 w-24" />
          <LoadingSkeleton variant="text" className="h-3 w-16" />
        </div>
      </div>
      <LoadingSkeleton variant="text" className="h-4 w-full" />
      <LoadingSkeleton variant="text" className="h-4 w-3/4" />
      <LoadingSkeleton variant="text" className="h-4 w-1/2" />
    </div>
  );
}

interface LoadingPageProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LoadingPage({ title = 'Loading', description, className }: LoadingPageProps) {
  return (
    <div className={cn('flex min-h-[400px] flex-col items-center justify-center space-y-4', className)}>
      <LoadingSpinner size="lg" className="text-primary" />
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
  );
}

interface FullPageLoadingProps {
  message?: string;
}

export function FullPageLoading({ message = 'Loading...' }: FullPageLoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mx-auto text-primary" />
        <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">{message}</p>
      </div>
    </div>
  );
}

interface LazyLoadingProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyLoading({ children, fallback, className }: LazyLoadingProps) {
  return (
    <div className={className}>
      <React.Suspense
        fallback={
          fallback || (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner />
            </div>
          )
        }
      >
        {children}
      </React.Suspense>
    </div>
  );
}
