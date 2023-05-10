const mongoose = require('mongoose');

const { Schema } = mongoose;
const Schedule = require('./Schedule');

const resourceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  resourceType: {
    type: String,
    required: true,
    trim: true,
    enum: ['video', 'article', 'quiz', 'other'],
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // ASSOCIATIONS - resource belong to user & resource be part of multiple schedules
  schedules: [Schedule.schema],
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
