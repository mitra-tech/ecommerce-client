import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export interface IChatSellerProps {
  _id: string;
  username: string;
  profilePicture: string;
  responseTime: number;
}

export interface IChatBuyerProps {
  _id: string;
  username: string;
  profilePicture: string;
}


export interface IChatBoxProps {
  seller: IChatSellerProps;
  buyer: IChatBuyerProps;
  gigId: string;
  onClose: () => void;
}

export interface IMessageDocument {
  _id?: string;
  conversationId?: string;
  body?: string;
  url?: string;
  file?: string;
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  gigId?: string;
  sellerId?: string;
  buyerId?: string;
  senderUsername?: string;
  senderPicture?: string;
  receiverUsername?: string;
  receiverPicture?: string;
  isRead?: boolean;
  hasOffer?: boolean;
  offer?: [];
  hasConversationId?: boolean;
  createdAt?: Date | string;
}

export interface IConversationDocument {
  _id: string;
  conversationId: string;
  senderUsername: string;
  receiverUsername: string;
}


export interface IChatWindowProps {
  chatMessages: IMessageDocument[];
  isError: boolean;
  isLoading: boolean;
  setSkip?: Dispatch<SetStateAction<boolean>>;
}



export interface IFilePreviewProps {
  image: string;
  file: File;
  isLoading: boolean;
  message: string;
  handleChange: (event: ChangeEvent) => void;
  onSubmit: (event: FormEvent) => void;
  onRemoveImage: () => void;
}
