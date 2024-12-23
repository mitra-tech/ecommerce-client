export interface IHomeProps {
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
