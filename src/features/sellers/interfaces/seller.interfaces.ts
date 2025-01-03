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
export interface IExperience {
  [key: string]: string | number | boolean | undefined;
  _id?: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorkingHere: boolean | undefined;
}
export interface IExperienceProps {
  selectedField?: IExperience;
  experienceFields?: IExperience[];
  experienceErrors?: IExperience[];
  setExperienceFields?: Dispatch<SetStateAction<IExperience[]>>;
  setShowExperienceAddForm?: Dispatch<SetStateAction<boolean>>;
  setShowExperienceEditForm?: Dispatch<SetStateAction<boolean>>;
}

export interface IEducation {
  [key: string]: string | number | undefined;
  _id?: string;
  country: string;
  university: string;
  title: string;
  major: string;
  year: string;
}

export interface IEducationProps {
  selectedField?: IEducation;
  educationFields?: IEducation[];
  educationErrors?: IEducation[];
  setEducationFields?: Dispatch<SetStateAction<IEducation[]>>;
  setShowEducationAddForm?: Dispatch<SetStateAction<boolean>>;
  setShowEducationEditForm?: Dispatch<SetStateAction<boolean>>;
}
