import PageLayout from '@/components/templates/PageLayout';
import { CurrentPageType } from '@/types/type';
import React from 'react';

interface Query {
  query: {
    current: string;
    year: string;
    month: string;
  };
}

const index = ({ query }: Query) => {
  return (
    <PageLayout current={query.current}>
      <>
        <div>{query.year}</div>
        <div>{query.month}</div>
      </>
    </PageLayout>
  );
};

export const getServerSideProps = async ({ query }: CurrentPageType) => {
  return {
    props: {
      query,
    },
  };
};

export default index;
