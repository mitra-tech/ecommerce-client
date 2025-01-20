import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';

import Quill from 'quill';
import BreadCrumb from 'src/shared/breadcrumbs/Breadcrumbs';
import Button from 'src/shared/button/Button';
import Dropdown from 'src/shared/dropdowns/Dropdown';
import TextAreaInput from 'src/shared/input/TextAreaInput';
import TextInput from 'src/shared/input/TextInput';
import { useAppSelector } from 'src/store/Store';
import { IReduxState } from 'src/store/Store.interface';
import { GIG_MAX_LENGTH, IAllowedGigItem, ICreateGig, IShowGigModal } from '../../interfaces/gig.interface';
import { categories, reactQuillUtils, expectedGigDelivery, showErrorToast } from 'src/shared/utils/utils.service';
import TagsInput from './components/TagsInput';
import { checkImage, readAsBase64 } from 'src/shared/utils/image-utils.service';
import { useGigSchema } from '../../hooks/useGigSchema';
import { gigInfoSchema } from '../../schemas/gig.schema';

const defaultGigInfo: ICreateGig = {
  title: '',
  categories: '',
  description: '',
  subCategories: [],
  tags: [],
  price: 0,
  coverImage: 'https://placehold.co/330x220?text=Cover+Image',
  expectedDelivery: 'Expected delivery',
  basicTitle: '',
  basicDescription: ''
};

const AddGig: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [gigInfo, setGigInfo] = useState<ICreateGig>(defaultGigInfo);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [subCategoryInput, setSubCategoryInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState<string>('');
  // We want to delete the character count for the description field if they exceed the max length.
  const reactQuillRef = useRef<ReactQuill | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [allowedGigItemLength, setAllowedGigItemLength] = useState<IAllowedGigItem>({
    gigTitle: '80/80',
    basicTitle: '40/40',
    basicDescription: '100/100',
    descriptionCharacters: '1200/1200'
  });
  const [showGigModal, setShowGigModal] = useState<IShowGigModal>({
    image: false,
    cancel: false
  });
  const [schemaValidation] = useGigSchema({ schema: gigInfoSchema, gigInfo });

  const handleFileChange = async (event: ChangeEvent): Promise<void> => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      const file: File = target.files[0];
      const isValid = checkImage(file, 'image');
      if (isValid) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(file);
        setGigInfo({ ...gigInfo, coverImage: `${dataImage}` });
      }
      setShowGigModal({ ...showGigModal, image: false });
    }
  };

  const onCreateGig = async (): Promise<void> => {
    try {
      // Removing <p> tags from the description field
      const editor: Quill | undefined = reactQuillRef?.current?.editor;
      // In React, it is not recommended to mutate objects directly. It is better to update with useState method.
      // The reason it is not recommended is because if the object is mutated directly,
      // 1) React is not able to keep track of the change
      // 2) There will be no re-renderng of the component.
      // In our case, we don't care about the above reasons because we update a property, validate and send to the backend.
      // The updated properly is not reflected in the component and we don't need to keep track of the object.
      // We are not using the useState method inside useEffect because it causes too many rerender errors.
      // Also, we are not updating the property inside the onChange method because editor?.getText() causes too many rerender errors.
      // The only option we have right now is to directly mutate the gigInfo useState object.
      gigInfo.description = editor?.getText().trim() as string;
      const isValid: boolean = await schemaValidation();
      if (isValid) {
        console.log(isValid);
      }
    } catch (error) {
      showErrorToast('Error creating gig');
    }
  };

  return (
    <>
      <div className="relative w-screen">
        <BreadCrumb breadCrumbItems={['Seller', 'Create new gig']} />
        <div className="container relative mx-auto my-5 px-2 pb-12 md:px-0">
          {/* <!-- CircularPageLoader --> */}
          {authUser && !authUser.emailVerified && (
            <div className="absolute left-0 top-0 z-[80] flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl">
              <span className="mt-40">Please verify your email.</span>
            </div>
          )}

          <div className="border-grey left-0 top-0 z-10 mt-4 block rounded border bg-white p-6">
            <div className="mb-6 grid md:grid-cols-5">
              <div className="pb-2 text-base font-medium">
                Gig title<sup className="top-[-0.3em] text-base text-red-500">*</sup>
              </div>
              <div className="col-span-4 md:w-11/12 lg:w-8/12">
                <TextInput
                  className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                  type="text"
                  name="gigTitle"
                  value={gigInfo.title}
                  placeholder="I will build something I'm good at."
                  maxLength={80}
                  onChange={(event: ChangeEvent) => {
                    const gigTitleValue = (event.target as HTMLInputElement).value;
                    setGigInfo({ ...gigInfo, title: gigTitleValue });
                    const counter: number = GIG_MAX_LENGTH.gigTitle - gigTitleValue.length;
                    setAllowedGigItemLength({ ...allowedGigItemLength, gigTitle: `${counter}/80` });
                  }}
                />
                <span className="flex justify-end text-xs text-[#95979d]">{allowedGigItemLength.gigTitle} Characters</span>
              </div>
            </div>
            <div className="mb-6 grid md:grid-cols-5">
              <div className="pb-2 text-base font-medium">
                Basic title<sup className="top-[-0.3em] text-base text-red-500">*</sup>
              </div>
              <div className="col-span-4 md:w-11/12 lg:w-8/12">
                <TextInput
                  className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                  placeholder="Write what exactly you'll do in short."
                  type="text"
                  name="basicTitle"
                  value={gigInfo.basicTitle}
                  maxLength={40}
                  onChange={(event: ChangeEvent) => {
                    const basicTitleValue = (event.target as HTMLInputElement).value;
                    setGigInfo({ ...gigInfo, basicTitle: basicTitleValue });
                    const counter: number = GIG_MAX_LENGTH.basicTitle - basicTitleValue.length;
                    setAllowedGigItemLength({ ...allowedGigItemLength, basicTitle: `${counter}/40` });
                  }}
                />
                <span className="flex justify-end text-xs text-[#95979d]">{allowedGigItemLength.basicTitle} Characters</span>
              </div>
            </div>
            <div className="mb-6 grid md:grid-cols-5">
              <div className="pb-2 text-base font-medium">
                Brief description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
              </div>
              <div className="col-span-4 md:w-11/12 lg:w-8/12">
                <TextAreaInput
                  className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                  placeholder="Write a brief description..."
                  name="basicDescription"
                  value={gigInfo.basicDescription}
                  rows={5}
                  maxLength={100}
                  onChange={(event: ChangeEvent) => {
                    const basicDescriptionValue = (event.target as HTMLInputElement).value;
                    setGigInfo({ ...gigInfo, basicDescription: basicDescriptionValue });
                    const counter: number = GIG_MAX_LENGTH.basicDescription - basicDescriptionValue.length;
                    setAllowedGigItemLength({ ...allowedGigItemLength, basicDescription: `${counter}/100` });
                  }}
                />
                <span className="flex justify-end text-xs text-[#95979d]">{allowedGigItemLength.basicDescription} Characters</span>
              </div>
            </div>
            <div className="mb-6 grid md:grid-cols-5">
              <div className="pb-2 text-base font-medium">
                Full description<sup className="top-[-0.3em] text-base text-red-500">*</sup>
              </div>
              <div className="col-span-4 md:w-11/12 lg:w-8/12">
                <ReactQuill
                  theme="snow"
                  value={gigInfo.description}
                  className="border-grey  rounded border"
                  modules={reactQuillUtils().modules}
                  formats={reactQuillUtils().formats}
                  ref={(element: ReactQuill | null) => {
                    reactQuillRef.current = element;
                    // we get accsess to some of the methods of the editor
                    const ReactQuillEditor = reactQuillRef.current?.getEditor();
                    // listen to the text-change event
                    ReactQuillEditor?.on('text-change', () => {
                      // get the length of the characters in the input text
                      if (ReactQuillEditor.getLength() > GIG_MAX_LENGTH.fullDescription) {
                        ReactQuillEditor.deleteText(GIG_MAX_LENGTH.fullDescription, ReactQuillEditor.getLength());
                      }
                    });
                  }}
                  onChange={(event: string, _, __, editor: UnprivilegedEditor) => {
                    setGigInfo({ ...gigInfo, description: event });
                    const counter: number = GIG_MAX_LENGTH.fullDescription - editor.getText().length;
                    setAllowedGigItemLength({ ...allowedGigItemLength, descriptionCharacters: `${counter}/1200` });
                  }}
                />
                <span className="flex justify-end text-xs text-[#95979d]">{allowedGigItemLength.descriptionCharacters} Characters</span>
              </div>
            </div>
            <div className="mb-12 grid md:grid-cols-5">
              <div className="pb-2 text-base font-medium">
                Category<sup className="top-[-0.3em] text-base text-red-500">*</sup>
              </div>
              <div className="relative col-span-4 md:w-11/12 lg:w-8/12">
                <Dropdown
                  text={gigInfo.categories}
                  maxHeight="300"
                  mainClassNames="absolute bg-white"
                  values={categories()}
                  onClick={(item: string) => {
                    setGigInfo({ ...gigInfo, categories: item });
                  }}
                />
              </div>
            </div>

            <TagsInput
              title="SubCategory"
              placeholder="E.g. Website development, Mobile apps"
              gigInfo={gigInfo}
              setGigInfo={setGigInfo}
              tags={subCategory}
              itemInput={subCategoryInput}
              itemName="subCategories"
              counterText="Subcategories"
              inputErrorMessage={false}
              setItem={setSubCategory}
              setItemInput={setSubCategoryInput}
            />

            <TagsInput
              title="Tags"
              placeholder="Enter search terms for your gig"
              gigInfo={gigInfo}
              setGigInfo={setGigInfo}
              tags={tags}
              itemInput={tagsInput}
              itemName="tags"
              counterText="Tags"
              inputErrorMessage={false}
              setItem={setTags}
              setItemInput={setTagsInput}
            />
            <div className="mb-6 grid md:grid-cols-5">
              <div className="pb-2 text-base font-medium">
                Price<sup className="top-[-0.3em] text-base text-red-500">*</sup>
              </div>
              <div className="col-span-4 md:w-11/12 lg:w-8/12">
                <TextInput
                  type="number"
                  className="border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal text-gray-600 focus:outline-none"
                  placeholder="Enter minimum price"
                  name="price"
                  value={`${gigInfo.price}`}
                  onChange={(event: ChangeEvent) => {
                    const value: string = (event.target as HTMLInputElement).value;
                    setGigInfo({ ...gigInfo, price: parseInt(value) > 0 ? parseInt(value) : 0 });
                  }}
                />
              </div>
            </div>
            <div className="mb-12 grid md:grid-cols-5">
              <div className="pb-2 text-base font-medium">
                Expected delivery<sup className="top-[-0.3em] text-base text-red-500">*</sup>
              </div>
              <div className="relative col-span-4 md:w-11/12 lg:w-8/12">
                <Dropdown
                  text={gigInfo.expectedDelivery}
                  maxHeight="300"
                  mainClassNames="absolute bg-white z-40"
                  values={expectedGigDelivery()}
                  onClick={(item: string) => {
                    setGigInfo({ ...gigInfo, expectedDelivery: item });
                  }}
                />{' '}
              </div>
            </div>
            <div className="mb-6 grid md:grid-cols-5">
              <div className="mt-6 pb-2 text-base font-medium lg:mt-0">
                Cover image<sup className="top-[-0.3em] text-base text-red-500">*</sup>
              </div>
              <div
                className="relative col-span-4 cursor-pointer md:w-11/12 lg:w-8/12"
                onMouseEnter={() => {
                  setShowGigModal((item) => ({ ...item, image: !item.image }));
                }}
                onMouseLeave={() => {
                  setShowGigModal((item) => ({ ...item, image: false }));
                }}
              >
                {gigInfo.coverImage && (
                  <img src={gigInfo.coverImage} alt="Cover Image" className="left-0 top-0 h-[220px] w-[320px] bg-white object-cover" />
                )}
                {!gigInfo.coverImage && (
                  <div className="left-0 top-0 flex h-[220px] w-[320px] cursor-pointer justify-center bg-[#dee1e7]"></div>
                )}
                {showGigModal.image && (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="absolute left-0 top-0 flex h-[220px] w-[320px] cursor-pointer justify-center bg-[#dee1e7]"
                  >
                    <FaCamera className="flex self-center" />
                  </div>
                )}
                <TextInput
                  name="image"
                  ref={fileRef}
                  type="file"
                  style={{ display: 'none' }}
                  onClick={() => {
                    if (fileRef.current) {
                      fileRef.current.value = '';
                    }
                  }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="grid xs:grid-cols-1 md:grid-cols-5">
              <div className="pb-2 text-base font-medium lg:mt-0"></div>
              <div className="col-span-4 flex gap-x-4 md:w-11/12 lg:w-8/12">
                <Button
                  disabled={false}
                  className="rounded bg-sky-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-3 md:text-base"
                  label="Create Gig"
                  onClick={onCreateGig}
                />
                <Button
                  disabled={false}
                  className="rounded bg-red-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:py-3 md:text-base"
                  label="Cancel"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGig;
