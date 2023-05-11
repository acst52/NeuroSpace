const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const educatorSchema = new Schema(
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
    phoneNumber:{
        type:Number
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
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    parent:[{
        
            type: Schema.Types.ObjectId,
            ref: 'Message',
          
    }],
    
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
educatorSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare incoming pw w hashed pw, validate for logging in
educatorSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Educator = mongoose.model('Educator', educatorSchema);

module.exports = User;
