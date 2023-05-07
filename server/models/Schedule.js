const mongoose = require('mongoose');
const { Schema } = mongoose;

const scheduleSchema = new Schema(
  {
    weekStartDate: {
      type: Date,
      required: true,
    },
    events: [
      {
        title: String,
        description: String,
        startDate: Date,
        endDate: Date,
        attendees: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
