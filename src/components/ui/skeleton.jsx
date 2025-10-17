export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm animate-pulse ${className}`}>
      <div className="h-48 bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}
