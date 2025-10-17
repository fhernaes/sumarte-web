import { Suspense } from 'react';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';
import { HeroSection } from '@/components/HeroSection';
import { ServiceCategories } from '@/components/ServiceCategories';
import { FeaturedInstructors } from '@/components/FeaturedInstructors';
import { CtaSection } from '@/components/CtaSection';
import { SkeletonCard } from '@/components/ui/skeleton';

// This will be statically generated at build time
export const dynamic = 'force-static';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-screen w-full bg-gray-100" />}>
        <HeroSection />
        
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Nuestros Servicios</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Descubre nuestra oferta educativa y servicios especializados en música
              </p>
            </div>
            
            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <SkeletonCard key={i} className="h-64" />
                ))}
              </div>
            }>
              <ServiceCategories />
            </Suspense>
          </div>
        </div>

        <Suspense fallback={
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <SkeletonCard key={i} className="h-96" />
                ))}
              </div>
            </div>
          </div>
        }>
          <FeaturedInstructors />
        </Suspense>

        <CtaSection />
      </Suspense>
    </div>
  );
}
