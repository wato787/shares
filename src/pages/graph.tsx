import PageLayout from '@/components/templates/PageLayout';
import React, { ReactElement } from 'react';

interface Current {
  current: string | undefined | null;
}

const graph = ({ current }: Current): ReactElement => {
  return <PageLayout current={current}>graph</PageLayout>;
};

export const getServerSideProps = async ({ query }: { query: any }) => {
  const current = query.current;
  return {
    props: {
      current,
    },
  };
};

export default graph;
