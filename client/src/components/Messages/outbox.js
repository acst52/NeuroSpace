// src/components/messages/outbox.js

// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_OUTBOX_MESSAGES } from '../../queries';
// import MessageList from './messageList';

// const Outbox = () => {
//   const { loading, error, data } = useQuery(GET_OUTBOX_MESSAGES);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   const messages = data.getOutboxMessages;

//   return (
//     <div className="outbox">
//       <h2>Outbox</h2>
//       <MessageList messages={messages} />
//     </div>
//   );
// };

// export default Outbox;

