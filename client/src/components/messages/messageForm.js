// src/components/messages/MessageForm.js

import React, { useState } from 'react';
import {CREATEMESSAGE } from '../../mutations';
import { useQuery, useMutation } from '@apollo/client';
 import {addMessage} from '../../mutations'

const MessageForm = () => {
  const [content, setContent] = useState('');
  const [addMessage] = useMutation(CREATEMESSAGE);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      const addedMessage = await addMessage({
        variables: {content}
    });
    setContent(prevMessages => [...prevMessages, addedMessage]);
    setContent("")

    }
  };
 

  return (
    <form className="message-form" >
      <input
        type="text"
        placeholder="Type your message here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>Send</button>
    </form>
  );
};

export default MessageForm;

