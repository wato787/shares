import PageLayout from '@/components/templates/PageLayout';
import React from 'react';

interface Query {
  query: {
    current: string;
    year: string;
    month: string;
  };
}

const index = ({ query }: Query) => {
  console.log(query);
  return (
    <PageLayout current={query.current}>
      <>
        <div>{query.year}</div>
        <div>{query.month}</div>
      </>
    </PageLayout>
  );
};

export const getServerSideProps = async ({ query }: any) => {
  return {
    props: {
      query,
    },
  };
};

export default index;
