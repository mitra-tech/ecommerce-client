import { FC, ReactElement } from 'react';

const Settings: FC = (): ReactElement => {
  return (
    <div className="mx-auto px-6 flex items-center flex-col container">
      <div className="w-[50%] bg-white px-6 pt-5 pb-7 mt-6">
        <div>{/* to do : change password */}</div>
      </div>
    </div>
  );
};

export default Settings;
