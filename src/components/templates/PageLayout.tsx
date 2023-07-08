import { Tooltip, IconButton, Avatar } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const PageLayout = (props: Props) => {
  return (
    <>
      <header className='flex items-center justify-between h-14 px-6 py-1 bg-secondary'>
        <div className='flex'>
          <span>Shares</span>
        </div>
        <Tooltip title='プロフィール'>
          <IconButton>
            {/* <Avatar
              sx={{ bgcolor: 'lightblue' }}
              aria-label='recipe'
              // src={avatar}
            ></Avatar> */}
            ava
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
