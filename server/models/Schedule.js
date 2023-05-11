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
          {
            type: Schema.Types.ObjectId,
            ref: 'Parent',
          },
          {
            type: Schema.Types.ObjectId,
            ref: 'MedicalPro',
          },
          {
            type: Schema.Types.ObjectId,
            ref: 'Educator',
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
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    parent:{
      type:Schema.Types.ObjectId,
      ref:'Parent'
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
