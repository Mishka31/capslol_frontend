﻿import React from "react";
import Avatar from "../Avatar";
import { ChatListItem, ChatUser, ChatUserTime, Wrapper } from "./styles";

const ChatListItems: React.FC<any> = ({
  active,
  image,
  name,
  animationDelay,
  isOnline,
}) => {
  return (
    <Wrapper>
      <ChatListItem
        style={{ animationDelay: `0.${animationDelay}s` }}
        className={`chatlist__item ${active ? active : ""} `}
      >
        <Avatar
          image={image ? image : "http://placehold.it/80x80"}
          isOnline={isOnline}
          alt={name}
        />

        <div>
          <ChatUser>{name}</ChatUser>
          <ChatUserTime>32 mins ago</ChatUserTime>
        </div>
      </ChatListItem>
    </Wrapper>
  );
};

export default ChatListItems;
