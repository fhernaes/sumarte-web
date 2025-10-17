import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import ProfilePageClient from './ProfilePageClient';

async function getUserProfile(session) {
  try {
    // Here you would typically fetch from your API
    // Example:
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    //   headers: {
    //     'Authorization': `Bearer ${session.user.accessToken}`
    //   }
    // });
    // if (!response.ok) throw new Error('Failed to fetch user profile');
    // return await response.json();
    
    // Fallback to session data
    return {
      ...session.user,
      educational_level: session.user.educational_level || '',
      institution: session.user.institution || '',
      degree: session.user.degree || '',
      experience: session.user.experience || '',
      video_presentation: session.user.video_presentation || '',
      avatar: session.user.avatar || null,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Return minimal profile data from session
    return {
      ...session.user,
      educational_level: '',
      institution: '',
      degree: '',
      experience: '',
      video_presentation: '',
      avatar: null,
    };
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  const userProfile = await getUserProfile(session);

  return <ProfilePageClient initialData={userProfile} />;
};
