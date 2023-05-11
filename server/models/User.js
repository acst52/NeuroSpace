// USER MODEL IN PROGRESS. HAVE BASE BELOW - WILL NEED TO ADD TO SCHEMA

const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');
const Schedule = require('./Schedule');

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
    // ASSOCIATIONS - user can have many schedules (or just one?), resources, orders (orders be keeping track of donations ONLY), donations and msgs
    // sign up - which following are you - select - if else - create child/parent/etc account / 
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
    //donation model - who donate - how much 
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
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

//  so for front end, while users are logging in, there will be a dropdown list for them to choose what type of users they are (eg. Parent, donators, Educators, )
// as long as they logged in, they will be able to donate 