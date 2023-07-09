import { User, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from 'react';
import { auth } from '../../../firebase';

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
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser({
          user,
        });
        if (!user) {
          router.push('/login');
        }

        return () => unsubscribe();
      });
    } catch (error) {
      setUser(initialState);
    }
    // eslint-ignore-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
