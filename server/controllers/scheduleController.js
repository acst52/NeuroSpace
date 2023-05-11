const { Schedule } = require('../models');

module.exports = {
  async getSchedule(req, res) {
    try {
      const sched = await Schedule.find();
      res.status(200).json(sched);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async createSchedule({ user, body }, res) {
    try {
      const newSched = await Schedule.create({ ...body, user: user._id });
      res.status(200).json(newSched);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateSchedule({ user, params, body }, res) {
    try {
      const updatedSched = await Schedule.findByIdAndUpdate(
        params.scheduleId,
        { ...body, user: user._id },
        { new: true }
      );
      res.status(200).json(updatedSched);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteSchedule({ params }, res) {
    try {
      await Schedule.findByIdAndDelete(params.scheduleId);
      res.status(200).json({ message: 'Schedule successfully deleted!' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = scheduleController;
