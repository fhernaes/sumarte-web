// components/SkeletonLoader.jsx
export function LoginFormSkeleton() {
    return (
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-10 bg-indigo-200 rounded mt-6"></div>
          </div>
        </div>
      </div>
    );
  }
  