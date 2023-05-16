// src/components/messages/MessageForm.js
import React from 'react';

const InboxList = ({ messages = [] }) => {
  console.log(messages);
  if (!messages.length) {
    return <h3>No messages Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a' }}
      >
        messages
      </h3>
      <div className="flex-row my-4">
        {messages &&
          messages.map((message) => (
            <div key={message._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  An user messaged you{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {message.createdAt}
                  </span>
                </h5>
                <p className="card-body">{message.messageText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default InboxList;