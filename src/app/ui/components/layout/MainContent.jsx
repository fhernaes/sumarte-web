'use client';

export function MainContent({ title, actions, children, className = '' }) {
  return (
    <main className={`flex-1 p-6 overflow-auto ${className}`}>
      {(title || actions) && (
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900">
                {title}
              </h1>
            )}
            {actions && (
              <div className="flex flex-wrap gap-2">
                {actions}
              </div>
            )}
          </div>
        </header>
      )}
      
      <div className="space-y-6">
        {children}
      </div>
    </main>
  );
}

// Variant for pages that don't need a header
MainContent.Simple = function MainContentSimple({ children, className = '' }) {
  return (
    <main className={`flex-1 p-6 overflow-auto ${className}`}>
      {children}
    </main>
  );
};