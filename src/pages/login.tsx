import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth, db } from '../../firebase';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import GoogleButton from 'react-google-button';
import Image from 'next/image';
import { doc, setDoc } from 'firebase/firestore';
import { useSnackbar } from '@/hooks/useSnackBar';

const Login = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const { showSnackbar } = useSnackbar();

  const signInWithGoogle = async () => {
    try {
      // Googleサインインのポップアップを開く
      const result = await signInWithPopup(auth, provider);

      // ユーザー情報をFirestoreに保存
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        { merge: true }
      );

      // ルートページにリダイレクト
      await router.push('/');
      showSnackbar('ログインしました', 'success');
    } catch (error) {
      showSnackbar('ログインに失敗しました', 'error');
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-full bg-primary'>
      <Card sx={{ maxWidth: '30%' }}>
        <div className='bg-secondary'>
          <div style={{ position: 'relative' }}>
            <Image src='/logo.png' width={900} height={900} alt='Shares' />
            <CardActions
              sx={{
                position: 'absolute',
                bottom: '1rem',
                left: '0',
                right: '0',
                justifyContent: 'center',
                paddingBottom: '2rem',
              }}
            >
              <GoogleButton onClick={signInWithGoogle} />
            </CardActions>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
