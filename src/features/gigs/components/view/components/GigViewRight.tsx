import { FC, ReactElement } from 'react';

import GigPackage from './gigViewRight/GigPackage';
import GigSeller from './gigViewRight/GigSeller';
import GigRelatedTags from './gigViewRight/GigRelatedTags';

const GigViewRight: FC = (): ReactElement => {
  return (
    <>
      <GigPackage />
      <GigSeller />
      <GigRelatedTags />
    </>
  );
};

export default GigViewRight;
