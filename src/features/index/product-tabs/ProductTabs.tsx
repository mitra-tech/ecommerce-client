import { FC, ReactElement} from 'react';
import { categories } from 'src/features/shared/utils/utils.service';
import { v4 as uuidv4 } from 'uuid';


const ProductTabs: FC = (): ReactElement => {

  return (
      <div className="relative m-auto mt-8 w-screen px-6 xl:container md:px-12 lg:px-6">
      <div className="mx-auto flex flex-col px-4 py-8 lg:px-6 lg:py-10">
        <div className="flex flex-col text-left">
          <h2 className="mb-3 text-3xl font-bold text-black">A broad selection of services</h2>
          <h4>Choose from a broad selection of services from expert freelancers for your next project.</h4>
        </div>
        <div className="mt-6">
          <ul className="lg:flex lg:justify-between gap-5 overflow-x-auto scroll-smooth whitespace-nowrap relative inline-block">
            {categories().map((category: string) => (
              <li
                key={uuidv4()}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
