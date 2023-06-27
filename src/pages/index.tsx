import { Inter } from 'next/font/google';
import Image from 'next/image';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@mui/material';
import { auth } from '../../firebase';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <>
      <div className='bg-grayBg'>
        <Button onClick={signInWithGoogle}>gogle</Button>
        <Image src='/../public/logo.png' width={300} height={300} alt='logo' />
        <p className='text-primary'>thedbf</p>
      </div>
    </>
  );
}
