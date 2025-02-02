import { FaCheck, FaCheckDouble, FaCircle } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ChatList = () => {
  return (
    <>
      <div className="border-grey truncate border-b px-5 py-3 text-base font-medium">
        <h2 className="w-6/12 truncate text-sm md:text-base lg:text-lg">All Conversations</h2>
      </div>
      <div className="absolute h-full w-full overflow-scroll pb-14">
        <div className="flex w-full cursor-pointer items-center space-x-4 px-5 py-4 hover:bg-gray-50">
          <LazyLoadImage
            src="https://placehold.co/330x220?text=Profile+Image"
            alt="profile image"
            className="h-10 w-10 object-cover rounded-full"
            placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
            effect="blur"
          />
          <div className="w-full text-sm dark:text-white">
            <div className="flex justify-between pb-1 font-bold text-[#777d74]">
              <span className="flex items-center">Username</span>
              <span className="font-normal">20/10/2025</span>
            </div>
            <div className="flex justify-between text-[#777d74]">
              <span>username This is a message</span>

              <FaCircle className="mt-2 text-sky-500" size={8} />
              <FaCheck className="mt-2" size={8} />
              <FaCheckDouble className="mt-2 text-sky-500" size={8} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatList;
