const { Schema, model } = require('mongoose');

const donationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // ASSOCIATIONS - donation made by single User. Orders model keeps track of donation records.
    donor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Donation = model('Donation', donationSchema);

module.exports = Donation;
