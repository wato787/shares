import { LinearProgress } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center pt-20  bg-secondary'>
      <Image src='/../public/logo.png' width={500} height={500} alt='loading' />
      <div className='w-1/4 -mt-20'>
        <LinearProgress color='primary' />
      </div>
    </div>
  );
};

export default LoadingScreen;
