import { FC, ReactElement } from 'react';

const ManageEarnings: FC = (): ReactElement => {
  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col flex-wrap">
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3">
          <div className="border border-grey flex items-center justify-center p-8 sm:col-span-1">
            <div className="flex flex-col gap-3">
              <span className="text-center text-base lg:text-xl">Earnings to date</span>
            </div>
          </div>
          <div className="border border-grey flex items-center justify-center p-8 sm:col-span-1">
            <div className="flex flex-col gap-3">
              <span className="text-center text-base lg:text-xl">Avg. selling price</span>
            </div>
          </div>
          <div className="border border-grey flex items-center justify-center p-8 sm:col-span-1">
            <div className="flex flex-col gap-3">
              <span className="text-center text-base lg:text-xl">Orders completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEarnings;
