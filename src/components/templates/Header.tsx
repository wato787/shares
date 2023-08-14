import { useAuthContext } from '@/feature/AuthProvider';
import {
  IconButton,
  Avatar,
  Menu,
  Box,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { ReactElement, useCallback, useState } from 'react';
import { auth } from '../../../firebase';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useRouter } from 'next/router';

const Header = (): ReactElement => {
  const { user } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const router = useRouter();

  //ユーザーメニュー
  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  //ログアウト
  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
  };

  //ユーザー設定
  const handleClickSetting = useCallback(() => {
    router.push({ pathname: '/setting', query: { current: 'setting' } });
  }, []);

  return (
    <header className='flex items-center justify-end h-16 px-6 py-1 bg-secondary border-b w-full'>
      <Tooltip title='プロフィール'>
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar
            sx={{ bgcolor: 'lightblue' }}
            src={user?.photoURL as string}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
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
          <MenuItem onClick={handleClickSetting}>
            <ManageAccountsIcon sx={{ mr: 2 }} />
            ユーザ設定
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 2 }} />
            ログアウト
          </MenuItem>
        </Box>
      </Menu>
    </header>
  );
};

export default Header;
