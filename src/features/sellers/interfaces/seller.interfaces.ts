// By extending ISellerDocument with the Record<string, any> we allow an object to contain other
// string keys with any values along with those defined in the interface.

import { Dispatch, SetStateAction } from "react";

// The nice part is that you still have the autocompletion for the defined properties
export type SellerType = string | string[] | number | Date | unknown | undefined;

export interface ISellerDocument extends Record<string, SellerType> {
  _id?: string;
  profilePublicId?: string;
  fullName: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  description: string;
  country: string;
  oneliner: string;
  skills: string[];
  ratingsCount?: number;
  ratingSum?: number;
  ratingCategories?: '';
  languages: '';
  responseTime: number;
  recentDelivery?: Date | string;
  experience: '';
  education: '';
  socialLinks: string[];
  certificates: '';
  ongoingJobs?: number;
  completedJobs?: number;
  cancelledJobs?: number;
  totalEarnings?: number;
  totalGigs?: number;
  paypal?: string; // not needed
  createdAt?: Date | string;
}

export interface IPersonalInfoData {
  [key: string]: string;
  fullName: string;
  profilePicture: string;
  description: string;
  responseTime: string;
  oneliner: string;
}
export interface IPersonalInfoProps {
  personalInfo: IPersonalInfoData;
  setPersonalInfo: Dispatch<SetStateAction<IPersonalInfoData>>;
  personalInfoErrors: IPersonalInfoData[];
}
