import classNames from 'classnames';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Image from 'next/image';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Current } from '@/types/type';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const PageNavigation = ({ current }: Current): ReactElement => {
  const open = useSelector((state: RootState) => state.drawer.open);
  return (
    <>
      <div className='flex items-center justify-around border-b h-16 z-10'>
        <Image
          src='/../public/toumeilogo.png'
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
              src='/../public/toumeilogo.png'
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
          current === 'dashboad' || !current ? 'bg-white' : ''
        )}
        href={{ pathname: '/', query: { current: 'dashboad' } }}
      >
        <DashboardIcon color='primary' />
        {open && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className='font-bold text-gray-500'>ダッシュボード</span>
          </div>
        )}
      </Link>
      <Link
        className={classNames(
          'w-full px-4 py-5 flex items-center border-b relative hover:bg-white',
          !open && 'justify-center',
          current === 'graph' ? 'bg-white' : ''
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
      <Link
        className={classNames(
          'w-full px-4 py-5 flex items-center border-b relative hover:bg-white',
          !open && 'justify-center',
          current === 'setting' ? 'bg-white' : ''
        )}
        href={{ pathname: '/setting', query: { current: 'setting' } }}
      >
        <SettingsIcon color='primary' />
        {open && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <span className='font-bold text-gray-500'>設定 ＆ 管理</span>
          </div>
        )}
      </Link>
    </>
  );
};

export default PageNavigation;
