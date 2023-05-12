const db = require('../config/connection')
const { User,Donation,Message } = require('../models');

const userData = require('./userData')
const donationData = require('./donationData')
const messageData = require('./messageData')

db.once('open', async()=>{
try{
  await User.deleteMany({});
  await User.insertMany(userData);

  await Donation.deleteMany({})
  await Donation.insertMany(donationData);

  await Message.deleteMany({})
  await Message.insertMany(messageData)

  console.log('all done!');
  process.exit(0);

}
catch (err) {
  throw err;
}

}); 



