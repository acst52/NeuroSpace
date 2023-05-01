const mongoose = require('mongoose');

const MongoDB_URI = process.env.MONGODB_URI || '';
mongoose.connect(MongoDB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports = mongoose.connection;
