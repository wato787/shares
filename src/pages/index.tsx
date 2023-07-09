import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';

interface Props {
  open: boolean;
}

export default function Home({ current }: Current, props: Props) {
  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <PageLayout current={current}>
      <>
        <p>b{props.open}</p>
        <button onClick={handleLogout}>logout</button>
      </>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ query }: CurrentPageType) => {
  if (!query.current) {
    return {
      props: {
        current: null,
      },
    };
  }
  const current = query.current;
  return {
    props: {
      current,
    },
  };
};
