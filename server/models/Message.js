const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    sender: {
      // red to User model, stores senderId
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      // ref to User model, stores recipientId
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // timestamps msgs
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Message = model('Message', messageSchema);

module.exports = Message;
