import { ISellerGig } from "src/features/gigs/interfaces/gig.interface";
import { ISellerDocument } from "src/features/sellers/interfaces/seller.interfaces";

export interface IHomeProps {
  gigs: ISellerGig[];
  title: string;
  subTitle?: string;
  category?: string;
}

export interface ISliderState {
  slideShow: string;
  slideIndex: number;
}

export interface ICategory {
  name: string;
  icon: string;
}

export interface IFeaturedExpertProps {
  sellers: ISellerDocument[];
}
