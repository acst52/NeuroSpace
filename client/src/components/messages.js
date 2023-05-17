import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { MESSAGESQUERY } from '../utils/queries';
import Donation from './donation';
import MessageForm from './Messages/messageForm';
import InboxList from './Messages/inbox';
import InboxMessages from './Messages/inbox';

function Messages() {
  const { loading, error, data } = useQuery(MESSAGESQUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const messages = data.messages;

  return (
    <div className="contentBody">
      <h1 className="title">DASHBOARD - Messages</h1>
      <MessageForm />
      {/* <InboxList/> */}
      {/* <InboxMessages /> */}
      <section className="messages">
        <ul>
          {messages.map((message) => (
            <li key={message._id}>{message.content}</li>
          ))}
        </ul>
      </section>
      <Donation />
    </div>
  );
}

export default Messages;
