import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { auth } from '../../firebase';

export default function Home() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <div className='bg-grayBg'>
        <Image src='/../public/logo.png' width={300} height={300} alt='logo' />
        <Button onClick={handleLogout}>logout</Button>
        <p className='text-primary'>thedbf</p>
      </div>
    </>
  );
}
