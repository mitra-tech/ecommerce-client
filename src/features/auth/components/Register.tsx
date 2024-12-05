import { FC, ReactElement } from 'react';
import { FaCamera, FaChevronLeft, FaEye, FaTimes } from 'react-icons/fa';
import Alert from '../../shared/alerts/Alert';
import Button from '../../shared/button/Button';
import TextInput from '../../shared/input/TextInput';
import { IModalBgProps } from '../../shared/modals/interfaces/modal.interface';
import ModalBg from '../../shared/modals/ModalBg';

const RegisterModal: FC<IModalBgProps> = ({ onClose, onToggle }): ReactElement => {
  return (
    <ModalBg>
      <div className="relative top-[10%] mx-auto w-11/12 max-w-md rounded bg-white md:w-2/3">
        <div className="relative px-5 py-5">
          <div className="flex justify-between text-2xl font-bold text-gray-600">
            <Button
              className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
              role="button"
              label={<FaChevronLeft className="icon icon-tabler icon-tabler-x" />}
            />
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 font-bold dark:bg-sky-500 lg:h-12 lg:w-12">
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

        <div className="relative px-5 py-5">
          <div>
            <label htmlFor="username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
              Username
            </label>
            <TextInput
              id="username"
              name="username"
              type="text"
              value=""
              className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
              placeholder="Enter username"
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
              value=""
              className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
              Password
            </label>
            <div className="relative mb-5 mt-2">
              <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                <FaEye className="icon icon-tabler icon-tabler-info-circle" />
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                value=""
                className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                placeholder="Enter password"
              />
            </div>
          </div>
          <Button
            disabled={false}
            className="text-md block w-full cursor-pointer rounded bg-sky-500 px-8 py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none"
            label="Continue"
          />
        </div>
        <div className="relative px-5 py-5">
          <div className="h-24">
            <label htmlFor="country" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
              Country
            </label>
            <div id="country" className="relative mb-5 mt-2"></div>
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
