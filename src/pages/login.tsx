import { Button } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';

const Login = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    await router.push('/');
  };

  return (
<>
    <Button onClick={signInWithGoogle}>google</Button>;
    
</>
    )

};

export default Login;
