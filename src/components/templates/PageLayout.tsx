import { Tooltip, IconButton, Avatar, Divider } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  current: string | undefined | null;
}

const PageLayout = (props: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleDrawer = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <div className='flex w-full h-full'>
        <aside
          className={classNames(
            'w-1/5 border-r bg-secondary h-screen relative flex flex-col justify-between',
            !open && 'w-16'
          )}
        >
          <div>
            <div className='flex items-center justify-around border-b h-16 z-10'>
              <Image
                src='/../public/largelogo.png'
                width={40}
                height={20}
                alt='Shares'
              />
              {open && (
                <>
                  <span className='text-3xl font-bold font-shares text-primary'>
                    Shares
                  </span>
                  <Image
                    src='/../public/largelogo.png'
                    width={40}
                    height={20}
                    alt='Shares'
                  />
                </>
              )}
            </div>
            <Link
              className={classNames(
                'w-full px-4 py-5 flex items-center border-b relative hover:bg-white',
                !open && 'justify-center',
                props.current === 'dashboad' || !props.current ? 'bg-white' : ''
              )}
              href={{ pathname: '/', query: { current: 'dashboad' } }}
            >
              <DashboardIcon color='primary' />
              {open && (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <span className='font-bold text-gray-500'>
                    ダッシュボード
                  </span>
                </div>
              )}
            </Link>
            <Link
              className={classNames(
                'w-full px-4 py-5 flex items-center border-b relative hover:bg-white',
                !open && 'justify-center',
                props.current === 'graph' ? 'bg-white' : ''
              )}
              href={{ pathname: '/graph', query: { current: 'graph' } }}
            >
              <ShowChartIcon color='primary' />
              {open && (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <span className='font-bold text-gray-500'>グラフ</span>
                </div>
              )}
            </Link>
            <div
              className={classNames(
                'w-full px-4 py-5 flex items-center border-b relative  hover:bg-white',
                !open && 'justify-center'
              )}
            >
              <DashboardIcon color='primary' />
              {open && (
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <span className='font-bold text-gray-500'>
                    ダッシュボード
                  </span>
                </div>
              )}
            </div>
          </div>

          <div
            className={classNames(
              'flex justify-end p-4 border-t',
              !open && 'justify-center'
            )}
          >
            {open ? (
              <IconButton size='small' onClick={toggleDrawer}>
                <ArrowBackIosNewIcon />
              </IconButton>
            ) : (
              <IconButton size='small' onClick={toggleDrawer}>
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </div>
        </aside>
        <div className='flex flex-col w-full'>
          <header className='flex items-center justify-end h-16 px-6 py-1 bg-secondary border-b w-full'>
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
          <div className='m-5'>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
