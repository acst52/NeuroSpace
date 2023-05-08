const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  uder: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  donation: {
    type: Schema.Types.ObjectId,
    ref: 'Donation',
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
