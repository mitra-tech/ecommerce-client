import { FC, ReactElement } from 'react';
import GigLeftOverview from './gigViewLeft/GigLeftOverview';
import GigLeftAbout from './gigViewLeft/GigLeftAbout';

const GigViewLeft: FC = (): ReactElement => {
  return (
    <>
      <GigLeftOverview />
      <GigLeftAbout />
    </>
  );
};

export default GigViewLeft;
