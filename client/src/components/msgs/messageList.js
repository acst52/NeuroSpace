// src/components/messages/MessageList.js

import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message._id} className="message">
          <div className="message-sender">{message.sender.username}</div>
          <div className="message-content">{message.content}</div>
          <div className="message-timestamp">{message.createdAt}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
