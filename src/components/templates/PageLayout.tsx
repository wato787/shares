import { Tooltip, IconButton, Avatar, Box, MenuItem, Menu } from '@mui/material';
import Image from 'next/image';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import classNames from 'classnames';
import Link from 'next/link';
import { toggleDrawer } from '@/slice/drawerSlice';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { ReactElement, useCallback, cloneElement, useState } from 'react';
import { RootState } from '@/store';
import { SettingsInputComponent } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

interface Props {
  children: ReactElement;
  current: string | undefined | null;
}

const PageLayout = (props: Props) => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.drawer.open);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

//ユーザーメニュー
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

//ログアウト
const handleLogout = async (): Promise<void> => {
  await signOut(auth)
}
  
  const handleToggleDrawer = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);
  return (
    <>
      <div className='flex w-full h-full'>
        <aside
          className={classNames(
            'w-1/5  bg-secondary h-screen relative flex flex-col justify-between',
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
          </div>

          <div
            className={classNames(
              'flex justify-end p-4 border-t',
              !open && 'justify-center'
            )}
          >
            {open ? (
              <IconButton size='small' onClick={handleToggleDrawer}>
                <ArrowBackIosNewIcon />
              </IconButton>
            ) : (
              <IconButton size='small' onClick={handleToggleDrawer}>
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </div>
        </aside>
        <div className='flex flex-col w-full'>
          <header className='flex items-center justify-end h-16 px-6 py-1 bg-secondary border-b w-full'>
            <Tooltip title='プロフィール'>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar sx={{ bgcolor: 'lightblue' }} aria-label='recipe' />
              </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box>
                  <MenuItem >
                    <SettingsInputComponent sx={{ mr: 2 }} /> ユーザー設定
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 2 }}  />
                    ログアウト
                  </MenuItem>
                </Box>
              </Menu>

          </header>
          <div className='m-5'>{cloneElement(props.children, { open })}</div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;
