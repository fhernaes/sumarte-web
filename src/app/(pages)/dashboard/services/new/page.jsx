import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import ServiceFormClient from '../components/ServiceFormClient';

export default async function NewServicePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  // You can fetch any initial data needed for the form here
  // For example, categories from your API
  const categories = [
    { id: 'music', name: 'Música' },
    { id: 'art', name: 'Arte' },
    { id: 'education', name: 'Educación' },
    { id: 'other', name: 'Otro' },
  ];

  // Default cities - you might want to fetch these from an API
  const cities = [
    'Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Tucumán', 'Otra'
  ];

  return <ServiceFormClient categories={categories} cities={cities} />;
}
