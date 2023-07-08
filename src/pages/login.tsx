import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import GoogleButton from 'react-google-button';
import Image from 'next/image';



const Login = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    await router.push('/');
  };



  return (
    <div className='flex justify-center items-center h-screen w-full bg-primary'>
      <Card sx={{ maxWidth: '30%' }}>
        <Image
          src='/../public/logo.png'
          width={900}
          height={900}
          alt='Shares'
        />
        <div className='bg-secondary'>
          <CardActions sx={{ flexDirection: 'column', alignItems: 'center' }}>
            <GoogleButton className='' onClick={signInWithGoogle} />
            
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default Login;
