// src/components/messages/MessageForm.js

import React, { useState } from 'react';
import { CREATEMESSAGE } from '../../mutations';
import { USERQUERY } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { addMessage } from '../../mutations';

const MessageForm = () => {
  const [content, setContent] = useState('');
  const [recipient, setRecipient] = useState('');
  const [addMessage] = useMutation(CREATEMESSAGE);
  const { data, loading } = useQuery(USERQUERY);
  const users = data?.users || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      const addedMessage = await addMessage({
        variables: { content, recipient },
      });
      setContent((prevMessages) => [...prevMessages, addedMessage]);
      setContent('');
    }
  };

  return (
    <form className="message-form">
      <select
        onChange={(e) => {
          setRecipient(e.target.value);
        }}
      >
        {users.map((user, i) => (
          <option value={user._id} key={user._id}>
            {user.firstName} {user.lastName}
          </option>
        ))}
      </select>
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

