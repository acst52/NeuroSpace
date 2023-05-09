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
    // ASSOCIATIONS - schedule belongs to user, sched can have many resources
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    resources: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Resource',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
