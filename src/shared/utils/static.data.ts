import browseImage from 'src/assets/browse.png';
import collaborate from 'src/assets/collaborate.png';
import contact from 'src/assets/contact.png';
import create from 'src/assets/create.png';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { ISliderImagesText } from '../shared.interface';
import { IBuyerDocument } from 'src/features/buyer/interfaces/buyer.interface';
import { ICategory } from 'src/features/home/interfaces/home.interfaces';
import { ISellerDocument } from 'src/features/sellers/interfaces/seller.interfaces';

export const categories: ICategory[] = [
  {
    name: 'Programming & Tech',
    icon: create
  },
  {
    name: 'Graphic & Design',
    icon: browseImage
  },
  {
    name: 'Digital Marketing',
    icon: collaborate
  },
  {
    name: 'Writing & Translation',
    icon: contact
  },
  {
    name: 'Video & Animation',
    icon: collaborate
  },
  {
    name: 'Music & Audio',
    icon: collaborate
  },
  {
    name: 'Data',
    icon: collaborate
  },
  {
    name: 'Business',
    icon: collaborate
  }
];

export const initialAuthUserValues: IAuthUser = {
  profilePublicId: null,
  country: null,
  createdAt: null,
  email: null,
  emailVerificationToken: null,
  emailVerified: null,
  id: null,
  passwordResetExpires: null,
  passwordResetToken: null,
  profilePicture: null,
  updatedAt: null,
  username: null,
  browserName: null,
  deviceType: null
};

export const sliderImagesText: ISliderImagesText[] = [
  { header: 'Leading the Way to Excellence', subHeader: 'Your Journey, Our Expertise' },
  { header: 'Turning Ideas into Impactful Content', subHeader: 'Innovate. Create. Elevate.' },
  { header: 'Turning Magic into Results', subHeader: 'Spelling Success, One Task at a Time' },
]

export const sliderImages: string[] = [
  'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1400,dpr_1.0/v1/attachments/generic_asset/asset/50218c41d277f7d85feeaf3efb4549bd-1599072608122/bg-signup-1400-x1.png',
  'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_1160,dpr_1.0/v1/attachments/generic_asset/asset/b49b1963f5f9008f5ff88bd449ec18f7-1608035772453/logo-maker-banner-wide-desktop-1352-2x.png',
  'https://fiverr-res.cloudinary.com/image/upload/w_430/q_auto,f_auto/v1/attachments/generic_asset/asset/10f680cb84a2f3ef4473ecfdede3a1ba-1593438129320/business%20logo%20design-fiverr%20guide.jpg',
  'https://fiverr-res.cloudinary.com/image/upload/w_430/f_auto,q_auto/v1/attachments/generic_asset/asset/b9495125dbb3432bf13275690d91a4f8-1656002118855/how%20to%20make%20a%20logo.jpg'
];

export const emptyBuyerData: IBuyerDocument = {
  _id: '',
  username: '',
  email: '',
  profilePicture: '',
  country: '',
  isSeller: false,
  purchasedGigs: [],
  createdAt: ''
};

export const emptySellerData: ISellerDocument = {
  _id: '',
  profilePublicId: '',
  fullName: '',
  profilePicture: '',
  username: '',
  email: '',
  description: '',
  country: '',
  oneliner: '',
  skills: [],
  ratingsCount: 0,
  ratingSum: 0,
  ratingCategories: {
    five: { value: 0, count: 0 },
    four: { value: 0, count: 0 },
    three: { value: 0, count: 0 },
    two: { value: 0, count: 0 },
    one: { value: 0, count: 0 }
  },
  recentDelivery: '',
  languages: [],
  responseTime: 0,
  experience: [],
  education: [],
  socialLinks: [],
  certificates: [],
  ongoingJobs: 0,
  completedJobs: 0,
  cancelledJobs: 0,
  totalEarnings: 0,
  totalGigs: 0,
  paypal: '',
  createdAt: ''
};
