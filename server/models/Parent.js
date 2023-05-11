const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Schedule = require('./Schedule');
const Child = require('./Child')

const parentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // set up pw validation & error msg***
    },
    // ASSOCIATIONS - user can have many schedules (or just one?), resources, orders (orders be keeping track of donations ONLY), donations and msgs
    schedules: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
      },
    ],
    resources: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Resource',
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    donations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Donation',
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    children:[Child],
    sessions:[Session],
    schedules:[Schedule]

  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
parentSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare incoming pw w hashed pw, validate for logging in
parentSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Parent = mongoose.model('Parent', parentSchema);

module.exports = User;