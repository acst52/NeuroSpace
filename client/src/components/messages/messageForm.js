// src/components/messages/MessageForm.js

import React, { useState } from 'react';
import { CREATEMESSAGE } from '../../mutations';
import { useMutation } from '@apollo/client';

const MessageForm = () => {
  const [content, setContent] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [addMessage] = useMutation(CREATEMESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() !== '' && recipientId.trim() !== '') {
      const addedMessage = await addMessage({
        variables: { content: content, recipientId: recipientId },
      });
      setContent(prevMessages => [...prevMessages, addedMessage]);
      setContent('');
      setRecipientId('');
      console.log(content);
    }
  };

  return (
    <form className="message-form">
      <input
        type="text"
        placeholder="Recipient ID..."
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type your message here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
};

export default MessageForm;


