import { FC, ReactElement } from 'react';

import GigPackage from './gigViewRight/GigPackage';
import GigSeller from './gigViewRight/GigSeller';

const GigViewRight: FC = (): ReactElement => {
  return (
    <>
      <GigPackage />
      <GigSeller />
    </>
  );
};

export default GigViewRight;
