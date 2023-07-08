import { Tooltip, IconButton, Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const PageLayout = (props: Props) => {
  return (
    <>
      <header className='flex items-center justify-between h-16 px-6 py-1 bg-secondary'>
        <div className='flex items-center gap-x-2'>
          <Image
            src='/../public/largelogo.png'
            width={45}
            height={25}
            alt='Shares'
          />
          <span className='text-4xl font-bold font-shares text-primary'>
            Shares
          </span>
          <Image
            src='/../public/largelogo.png'
            width={45}
            height={25}
            alt='Shares'
          />
        </div>
        <Tooltip title='プロフィール'>
          <IconButton>
            <Avatar
              sx={{ bgcolor: 'lightblue' }}
              aria-label='recipe'
              src='/../public/largelogo.png'
            />
          </IconButton>
        </Tooltip>
      </header>
      <div className='flex'>
        <aside>tehbrfvds</aside>
        {props.children}
      </div>
    </>
  );
};

export default PageLayout;
