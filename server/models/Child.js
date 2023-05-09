const { Schema, model } = require('mongoose');


const childSchema = new Schema(
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
    educationalNeeds:{
      type:String,
    },

    Preferences:{
      type:String,
    },
},
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
 
  // Initialize our Video model
  const Child = model('child', childSchema);
  
  module.exports = Child;