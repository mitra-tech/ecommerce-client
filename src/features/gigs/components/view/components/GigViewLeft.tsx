import { FC, ReactElement } from 'react';
import GigLeftOverview from './gigViewLeft/GigLeftOverview';
import GigLeftAbout from './gigViewLeft/GigLeftAbout';
import GigViewReviews from './gigViewLeft/GigViewReview';

const GigViewLeft: FC = (): ReactElement => {
  return (
    <>
      <GigLeftOverview />
      <GigLeftAbout />
      <GigViewReviews />
    </>
  );
};

export default GigViewLeft;
