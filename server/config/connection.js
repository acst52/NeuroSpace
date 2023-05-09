const mongoose = require('mongoose');

const MongoDB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/neurospace';

mongoose.connect(MongoDB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
