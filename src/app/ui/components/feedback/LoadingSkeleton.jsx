'use client';

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
        <div className="animate-pulse space-y-2">
          <div className="h-8 w-32 bg-gray-200 rounded mb-8 mx-auto"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Main Content Skeleton */}
      <div className="flex-1 p-6">
        <div className="animate-pulse space-y-6">
          {/* Header */}
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          
          {/* Content */}
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-5">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mt-4"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded-t-lg"></div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 border-b border-gray-200 flex items-center px-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}