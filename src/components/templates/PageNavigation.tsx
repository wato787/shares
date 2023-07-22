import classNames from 'classnames';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import Image from 'next/image';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Current } from '@/types/type';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
const navigationItems = [
  {
    href: { pathname: '/', query: { current: 'dashboard' } },
    label: 'ダッシュボード',
    icon: <DashboardIcon color='primary' />,
    labelEn: 'dashboard',
  },
  {
    href: { pathname: '/graph', query: { current: 'graph' } },
    label: 'グラフ',
    icon: <BarChartIcon color='primary' />,
    labelEn: 'graph',
  },
  {
    href: {
      pathname: '/detail',
      query: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        current: 'detail',
      },
    },
    label: '月別の詳細',
    icon: <HistoryIcon color='primary' />,
    labelEn: 'detail',
  },
  {
    href: { pathname: '/setting', query: { current: 'setting' } },
    label: '設定 ＆ 管理',
    icon: <SettingsIcon color='primary' />,
    labelEn: 'setting',
  },
];

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

      {navigationItems.map((item) => (
        <Link
          key={item.label}
          className={classNames(
            'w-full px-4 py-5 flex items-center border-b relative hover:bg-white',
            !open && 'justify-center',
            current === item.labelEn ||
              (!current &&
                item.labelEn === 'dashboard' &&
                typeof window !== 'undefined' &&
                window.location.pathname === '/')
              ? 'bg-white'
              : ''
          )}
          href={item.href}
        >
          {item.icon}
          {open && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <span className='font-bold text-gray-500'>{item.label}</span>
            </div>
          )}
        </Link>
      ))}
    </>
  );
};

export default PageNavigation;
