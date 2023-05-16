// USER MODEL IN PROGRESS. HAVE BASE BELOW - WILL NEED TO ADD TO SCHEMA

const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Schedule = require('./Schedule');
const Message = require('./Message');
const Donation = require('./Donation');
const Resource = require('./Resource');

const userSchema = new Schema(
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
    sentMessage:[
      {
type: Schema.Types.ObjectId,
ref: "Messages"
      }
    ],
    receiveMessage: [
      {
        type: Schema. Types. ObjectId,
        ref: "Messages"
      }
    ],
    // ASSOCIATIONS - user can have many schedules (or just one?), resources, orders (orders be keeping track of donations ONLY), donations and msgs
    // ObjectId - wont give access to all. have to do array of schedule(etc) schemas
    schedules: [Schedule.schema],
    resources: [Resource.schema],
    orders: [Order.schema],
    donations: [Donation.schema],
    messages: [Message.schema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare incoming pw w hashed pw, validate for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
