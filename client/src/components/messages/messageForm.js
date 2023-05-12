// src/components/messages/MessageForm.js

import React, { useState } from 'react';

const MessageForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() !== '') {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;