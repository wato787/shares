import Chart from '@/components/organisms/Chart';
import PageLayout from '@/components/templates/PageLayout';
import { Current, CurrentPageType } from '@/types/type';

import React, { ReactElement } from 'react';

const graph = ({ current }: Current): ReactElement => {
  return (
    <>
      <PageLayout current={current}>
        <Chart />
      </PageLayout>
    </>
  );
};

export const getServerSideProps = async ({ query }: CurrentPageType) => {
  const current = query.current;
  return {
    props: {
      current,
    },
  };
};

export default graph;
