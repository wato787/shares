import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { User } from '@firebase/auth';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../../firebase';
import { useRouter } from 'next/router';

export type GlobalAuthState = {
  user: User | null | undefined;
};
const initialState: GlobalAuthState = {
  user: undefined,
};
const AuthContext = createContext<GlobalAuthState>(initialState);

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<GlobalAuthState>(initialState);
  const router = useRouter();

  useEffect(() => {
    try {
      return onAuthStateChanged(auth, (user) => {
        setUser({
          user,
        });
      });
    } catch (error) {
      setUser(initialState);
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
