import classNames from 'classnames';
import React, { ReactElement, memo } from 'react';

interface Props {
  monthName: string;
  monthColor: string;
}

const MonthBadge = memo((props: Props): ReactElement => {
  return (
    <span
      className={classNames(
        'font-bold text-3xl p-3 font-shares',
        props.monthColor
      )}
    >
      {props.monthName}
    </span>
  );
});

export default MonthBadge;
