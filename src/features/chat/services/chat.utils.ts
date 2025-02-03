import { cloneDeep, findIndex, remove } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { lowerCase } from 'src/shared/utils/utils.service';
import { socket } from 'src/sockets/socket.service';

import { IMessageDocument } from '../interfaces/chat.interface';

// recieved chat message
export const chatMessageReceived = (
  conversationId: string,
  chatMessagesData: IMessageDocument[],
  chatMessages: IMessageDocument[],
  setChatMessagesData: Dispatch<SetStateAction<IMessageDocument[]>>
): void => {
  socket.on('message received', (data: IMessageDocument) => {
    chatMessages = cloneDeep(chatMessagesData);
    if (data.conversationId === conversationId) {
      chatMessages.push(data);
      const uniq = chatMessages.filter((item: IMessageDocument, index: number, list: IMessageDocument[]) => {
        const itemIndex = list.findIndex((listItem: IMessageDocument) => listItem._id === item._id);
        return itemIndex === index;
      });
      setChatMessagesData(uniq);
    }
  });
};

// recieved chat messages
export const chatListMessageReceived = (
  username: string,
  chatList: IMessageDocument[],
  conversationListRef: IMessageDocument[],
  setChatList: Dispatch<SetStateAction<IMessageDocument[]>>
): void => {
  socket.on('message received', (data: IMessageDocument) => {
    conversationListRef = cloneDeep(chatList);
    if (
      lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`) ||
      lowerCase(`${data.senderUsername}`) === lowerCase(`${username}`)
    ) {
      const messageIndex = findIndex(chatList, ['conversationId', data.conversationId]);
      if (messageIndex > -1) {
        remove(conversationListRef, (chat: IMessageDocument) => chat.conversationId === data.conversationId);
      } else {
        remove(conversationListRef, (chat: IMessageDocument) => chat.receiverUsername === data.receiverUsername);
      }
      conversationListRef = [data, ...conversationListRef];

      setChatList(conversationListRef);
    }
  });
};

export const chatListMessageUpdated = (
  username: string,
  chatList: IMessageDocument[],
  conversationListRef: IMessageDocument[],
  setChatList: Dispatch<SetStateAction<IMessageDocument[]>>
): void => {
  socket.on('message updated', (data: IMessageDocument) => {
    conversationListRef = cloneDeep(chatList);
    if (
      lowerCase(`${data.receiverUsername}`) === lowerCase(`${username}`) ||
      lowerCase(`${data.senderUsername}`) === lowerCase(`${username}`)
    ) {
      const messageIndex = findIndex(chatList, ['conversationId', data.conversationId]);
      if (messageIndex > -1) {
        conversationListRef.splice(messageIndex, 1, data);
      }

      setChatList(conversationListRef);
    }
  });
};
