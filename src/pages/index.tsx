import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import PageLayout from '@/components/templates/PageLayout';

interface Current {
  current: string | undefined | null;
}

export default function Home({ current }: Current, props: any) {
  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
  };

  return (
    <PageLayout current={current}>
      <p>b{props.open}</p>
    </PageLayout>
  );
}

export const getServerSideProps = async ({ query }: { query: any }) => {
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
