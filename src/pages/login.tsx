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
        <div className='bg-secondary'>
          <div style={{ position: 'relative' }}>
            <Image
              src='/../public/logo.png'
              width={900}
              height={900}
              alt='Shares'
            />
            <CardActions
              sx={{
                position: 'absolute',
                bottom: '1rem',
                left: '0',
                right: '0',
                justifyContent: 'center',
                paddingBottom: '2rem',
              }}
            >
              <GoogleButton onClick={signInWithGoogle} />
            </CardActions>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
