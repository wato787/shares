import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';

interface Props {
  open: boolean;
}

export default function Home({ current }: Current, props: Props) {
  return (
    <PageLayout current={current}>
      <>
        <p>b{props.open}</p>
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
