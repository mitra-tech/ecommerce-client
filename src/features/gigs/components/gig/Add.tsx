

import { FC, ReactElement} from 'react';
import { FaCamera } from 'react-icons/fa';

import BreadCrumb from 'src/shared/breadcrumbs/Breadcrumbs';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdowns/Dropdown';
import TextAreaInput from 'src/shared/input/TextAreaInput';
import TextInput from 'src/shared/input/TextInput';



const AddGig: FC = (): ReactElement => {


  return (
   <>
    <div className="relative w-screen">
    <BreadCrumb breadCrumbItems={['Seller', 'Create new gig' ]} />
    <div className="container relative mx-auto my-5 px-2 pb-12 md:px-0">
        {/* <!-- CircularPageLoader --> */}
        <div
            className="absolute left-0 top-0 z-[80] flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl">
            <span className="mt-40">Please verify your email.</span>
        </div>

        <div className="border-grey left-0 top-0 z-10 mt-4 block rounded border bg-white p-6">
            <div className="mb-6 grid md:grid-cols-5">
                <div className="pb-2 text-base font-medium">
                    Gig title<sup className="top-[-0.3em] text-base text-red-500">*</sup>
                </div>
                <div className="col-span-4 md:w-11/12 lg:w-8/12">
                    <TextInput
                        className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                        type="text" name="gigTitle" value="" placeholder="I will build something I'm good at."
                        maxLength={80} />
                    <span className="flex justify-end text-xs text-[#95979d]">100 Characters</span>
                </div>
            </div>
            <div className="mb-6 grid md:grid-cols-5">
                <div className="pb-2 text-base font-medium">
                    Basic title<sup className="top-[-0.3em] text-base text-red-500">*</sup>
                </div>
                <div className="col-span-4 md:w-11/12 lg:w-8/12">
                    <TextInput
                        className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                        placeholder="Write what exactly you'll do in short." type="text" name="basicTitle" value=""
                        maxLength={40} />
                    <span className="flex justify-end text-xs text-[#95979d]">100 Characters</span>
                </div>
            </div>
            <div className="mb-6 grid md:grid-cols-5">
                <div className="pb-2 text-base font-medium">
                    Brief description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
                </div>
                <div className="col-span-4 md:w-11/12 lg:w-8/12">
                    <TextAreaInput
                        className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                        placeholder="Write a brief description..." name="basicDescription" value="" rows={5}
                        maxLength={100} />
                    <span className="flex justify-end text-xs text-[#95979d]">100 Characters</span>
                </div>
            </div>
            <div className="mb-6 grid md:grid-cols-5">
                <div className="pb-2 text-base font-medium">
                    Full description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
                </div>
                <div className="col-span-4 md:w-11/12 lg:w-8/12">
                    {/* <!-- ReactQuill --> */}
                    <span className="flex justify-end text-xs text-[#95979d]">120 Characters</span>
                </div>
            </div>
            <div className="mb-12 grid md:grid-cols-5">
                <div className="pb-2 text-base font-medium">
                    Category<sup className="top-[-0.3em] text-base text-red-500">*</sup>
                </div>
                <div className="relative col-span-4 md:w-11/12 lg:w-8/12">
                    <Dropdown text="" maxHeight="300" mainClassNames="absolute bg-white" values={[]} />
                </div>
            </div>
{/*
            <!-- TagsInput -->

            <!-- TagsInput --> */}

            <div className="mb-6 grid md:grid-cols-5">
                <div className="pb-2 text-base font-medium">
                    Price<sup className="top-[-0.3em] text-base text-red-500">*</sup>
                </div>
                <div className="col-span-4 md:w-11/12 lg:w-8/12">
                    <TextInput type="number"
                        className="border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal text-gray-600 focus:outline-none"
                        placeholder="Enter minimum price" name="price" value="" />
                </div>
            </div>
            <div className="mb-12 grid md:grid-cols-5">
                <div className="pb-2 text-base font-medium">
                    Expected delivery<sup className="top-[-0.3em] text-base text-red-500">*</sup>
                </div>
                <div className="relative col-span-4 md:w-11/12 lg:w-8/12">
                    <Dropdown text="" maxHeight="300" mainClassNames="absolute bg-white z-40" values={[]} />
                </div>
            </div>
            <div className="mb-6 grid md:grid-cols-5">
                <div className="mt-6 pb-2 text-base font-medium lg:mt-0">
                    Cover image<sup className="top-[-0.3em] text-base text-red-500">*</sup>
                </div>
                <div className="relative col-span-4 cursor-pointer md:w-11/12 lg:w-8/12">
                    <img src="https://placehold.co/330x220?text=Profile+Image" alt="Cover Image"
                        className="left-0 top-0 h-[220px] w-[320px] bg-white object-cover" />
                    <div className="left-0 top-0 flex h-[220px] w-[320px] cursor-pointer justify-center bg-[#dee1e7]">
                    </div>
                    <div
                        className="absolute left-0 top-0 flex h-[220px] w-[320px] cursor-pointer justify-center bg-[#dee1e7]">
                        <FaCamera className="flex self-center" />
                    </div>
                    <TextInput name="image" type="file" />
                </div>
            </div>
            <div className="grid xs:grid-cols-1 md:grid-cols-5">
                <div className="pb-2 text-base font-medium lg:mt-0"></div>
                <div className="col-span-4 flex gap-x-4 md:w-11/12 lg:w-8/12">
                    <Button disabled={false}
                        className="rounded bg-sky-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-3 md:text-base"
                        label="Create Gig" />
                    <Button disabled={false}
                        className="rounded bg-red-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:py-3 md:text-base"
                        label="Cancel" />
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
};

export default AddGig;
