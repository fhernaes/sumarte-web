import Image from 'next/image';
import { FiMusic } from 'react-icons/fi';

export function OptimizedImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600, 
  className = '',
  icon: Icon = FiMusic,
  withOverlay = true
}) {
  if (!src) {
    return (
      <div className={`relative bg-gradient-to-r from-indigo-500 to-purple-600 ${className}`}>
        {withOverlay && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-16 h-16 text-white/30" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority={!!src.includes('hero')}
      />
      {withOverlay && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <Icon className="w-16 h-16 text-white/30" />
        </div>
      )}
    </div>
  );
}
