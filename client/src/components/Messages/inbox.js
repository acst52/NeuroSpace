// src/components/messages/inbox.js

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_INBOX_MESSAGES } from '../../queries';
import MessageList from './messageList';

const Inbox = () => {
  const { loading, error, data } = useQuery(GET_INBOX_MESSAGES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const messages = data.getInboxMessages;

  return (
    <div className="inbox">
      <h2>Inbox</h2>
      <MessageList messages={messages} />
    </div>
  );
};

export default Inbox;
