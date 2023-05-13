const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // timestamps msgs
    },
    // ASSOCIATIONS - msg can be sent from 1 user to another, sender & recipient ref 'User'
    sender: {
      // red to User model, stores senderId
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    recipient: {
      // ref to User model, stores recipientId
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//If using schema, can't make it module 
const Message = model('Message', messageSchema);

module.exports = Message;
