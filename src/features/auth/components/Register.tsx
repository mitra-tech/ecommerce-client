import { FC, ReactElement, useState } from 'react';
import { FaCamera, FaChevronLeft, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import Alert from '../../../shared/alerts/Alert';
import Button from '../../../shared/button/Button';
import TextInput from '../../../shared/input/TextInput';
import { IModalBgProps } from '../../../shared/modals/interfaces/modal.interface';
import ModalBg from '../../../shared/modals/ModalBg';
import { ISignUpPayload } from '../interfaces/auth.interface';
import { ChangeEvent } from 'react';
import Dropdown from 'src/shared/dropdowns/Dropdown';
import { countriesList } from 'src/shared/utils/utils.service';

const RegisterModal: FC<IModalBgProps> = ({ onClose, onToggle }): ReactElement => {
  const [country, setCountry] = useState<string>('Select Country');
  const [passwordType, setPasswordType] = useState<string>('password');

  const [step, setStep] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<ISignUpPayload>({
    username: '',
    password: '',
    email: '',
    country: '',
    profilePicture: '',
    browserName: '',
    deviceType: ''
  });

  return (
    <ModalBg>
      <div className="relative top-[10%] mx-auto w-11/12 max-w-md rounded bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <div className="flex justify-between text-2xl font-bold text-gray-600">
            {step > 1 && (
              <Button
                className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                role="button"
                onClick={() => setStep(step - 1)}
                label={<FaChevronLeft className="icon icon-tabler icon-tabler-x" />}
              />
            )}
            <h1 className="flex w-full justify-center">Join</h1>
            <Button
              className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
              role="button"
              onClick={onClose}
              label={<FaTimes className="icon icon-tabler icon-tabler-x" />}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center px-5 py-5">
          <ol className="flex w-full">
            <li className="flex w-full items-center text-white after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-sky-500 after:content-[''] dark:after:border-sky-500">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 font-bold dark:bg-sky-500 lg:h-12 lg:w-12 ${step === 2 ? 'bg-sky-500 dark:bg-sky-500' : 'bg-sky-300/50 dark:bg-sky-300'}`}
              >
                1
              </span>
            </li>
            <li className="flex items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white lg:h-12 lg:w-12">
                2
              </span>
            </li>
          </ol>
        </div>
        <div className="px-5">
          <Alert type="error" message="alert" />
        </div>
        {step === 1 && (
          <div className="relative px-5 py-5">
            <div>
              <label htmlFor="username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Username
              </label>
              <TextInput
                id="username"
                name="username"
                type="text"
                value={userInfo.username}
                className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="Enter username"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, username: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Email
              </label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={userInfo.email}
                className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="Enter email"
                onChange={(event: ChangeEvent) => {
                  setUserInfo({ ...userInfo, email: (event.target as HTMLInputElement).value });
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <div className="relative mb-5 mt-2">
                <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                  {passwordType === 'password' ? (
                    <FaEyeSlash
                      onClick={() => {
                        setPasswordType('text');
                      }}
                      className="icon icon-tabler icon-tabler-info-circle"
                    />
                  ) : (
                    <FaEye
                      onClick={() => {
                        setPasswordType('password');
                      }}
                      className="icon icon-tabler icon-tabler-info-circle"
                    />
                  )}
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type={passwordType}
                  value={userInfo.password}
                  className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                  placeholder="Enter password"
                  onChange={(event: ChangeEvent) => {
                    setUserInfo({ ...userInfo, password: (event.target as HTMLInputElement).value });
                  }}
                />
              </div>
            </div>
            <Button
              disabled={!userInfo.username || !userInfo.email || !userInfo.password}
              className={`text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none ${
                !userInfo.username || !userInfo.email || !userInfo.password ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              label="Continue"
              onClick={() => setStep(2)}
            />
          </div>
        )}
        {step === 2 && (
          <div className="relative px-5 py-5">
            <div className="h-24">
              <label htmlFor="country" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Country
              </label>
              <div id="country" className="relative mb-5 mt-2">
                <Dropdown
                  text={country}
                  maxHeight="200"
                  mainClassNames="absolute bg-white z-50"
                  showSearchInput={true}
                  values={countriesList()}
                  setValue={setCountry}
                  onClick={(item: string) => {
                    setCountry(item);
                    setUserInfo({ ...userInfo, country: item });
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="profilePicture" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Profile Picture
              </label>
              <div className="relative mb-5 mt-2 w-[20%] cursor-pointer">
                <img id="profilePicture" src="" alt="Profile Picture" className="" />
                <div className="left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]"></div>
                <div className="absolute left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]">
                  <FaCamera className="flex self-center" />
                </div>
                <TextInput name="image" type="file" />
              </div>
            </div>
            <Button
              disabled={false}
              className="text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none"
              label="SIGNUP"
            />
          </div>
        )}
        <hr />
        <div className="px-5 py-4">
          <div className="ml-2 flex w-full justify-center text-sm font-medium">
            <div className="flex justify-center">
              Already a memeber?{' '}
              <p
                onClick={() => {
                  if (onToggle) {
                    onToggle(true);
                  }
                }}
                className="ml-2 flex cursor-pointer text-blue-600 hover:underline"
              >
                Sign In
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalBg>
  );
};

export default RegisterModal;
