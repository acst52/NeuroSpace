const mongoose = require('mongoose');
const Schedule = require('./Schedule');
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startDate: {
        type: String,
        required:true,
    },
    endDate: {
        type:String,
        required: true,
    },
    scheduleId: {
        type: Schema.Types.ObjectId,
        ref:'Schedule',
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference the 'User' model
    }],

},
{
    toJSON: {
      virtuals: true,
    },
  })   

  const Event = mongoose.model('Event', eventSchema);

module.exports = Event;