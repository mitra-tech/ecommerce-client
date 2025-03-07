import { FC, ReactElement } from 'react';

import GigLeftAbout from './gigViewLeft/GigLeftAbout';
import GigLeftOverview from './gigViewLeft/GigLeftOverview';
import GigViewReviews from './gigViewLeft/GigViewReviews';

const GigViewLeft: FC = (): ReactElement => {
  return (
    <>
      <GigLeftOverview />
      <GigLeftAbout />
      <GigViewReviews showRatings={true} hasFetchedReviews={false} />
    </>
  );
};

export default GigViewLeft;
