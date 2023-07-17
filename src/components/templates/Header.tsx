import { useAuthContext } from '@/feature/auth/AuthProvider';
import { SettingsInputComponent } from '@mui/icons-material';
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

const Header = (): ReactElement => {
  const { user } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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

  return (
    <header className='flex items-center justify-end h-16 px-6 py-1 bg-secondary border-b w-full'>
      <Tooltip title='プロフィール'>
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar
            sx={{ bgcolor: 'lightblue' }}
            aria-label='recipe'
            src={user?.photoURL as string}
          />
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
          <MenuItem>
            <SettingsInputComponent sx={{ mr: 2 }} /> ユーザー設定
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
