// src/components/messages/MessageForm.js

import React from 'react';
// import { useQuery, useMutation } from '@apollo/client';
// import { MESSAGESQUERY } from '../utils/queries';
//这个是收消息的地方但我不知道怎么写
function InboxMessages() {
  //   //   const { loading, error, data } = useQuery(MESSAGESQUERY);

  //   // console.log(data)

  //   //   if (loading) {
  //   //     return <p>Loading...</p>;
  //   //   }

  //   //   if (error) {
  //   //     return <p>Error: {error.message}</p>;
  //   //   }

  //   //   const messages = data.messages;
  return (
    <>
      <h1
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        Inbox messages
      </h1>
      {/* <div className="flex-row my-4">
//         {messages &&
//           messages.map((message) => (
//             <div key={message._id} className="col-12 mb-3 pb-3">
//               <div className="p-3 bg-dark text-light">
//                 <h5 className="card-header">
//                   An user messaged you{' '}
//                   <span style={{ fontSize: '0.825rem' }}>
//                     on {message.createdAt}
//                   </span>
//                 </h5>
//                 <p className="card-body">{message.content}</p>
//               </div>
//             </div>
//           ))}
//       </div> */}
    </>
  );
}

export default InboxMessages;
