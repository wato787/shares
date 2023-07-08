import Image from 'next/image';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import PageLayout from '@/components/templates/PageLayout';

export default function Home() {
  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
  };

  return <PageLayout>muynbgfvd</PageLayout>;
}
