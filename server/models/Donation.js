const { Schema, model } = require('mongoose');

const donationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0.99,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    // already reference the donation in user module 
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
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
