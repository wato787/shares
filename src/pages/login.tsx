import React from 'react';

import { Button } from '@mui/material';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    await router.push('/');
  };

  return <Button onClick={signInWithGoogle}>google</Button>;
};

export default Login;
