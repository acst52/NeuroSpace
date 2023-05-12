const db = require('../config/connection')
const { User,Donation,Message } = require('../models');

const userData = require('./userData')
const donationData = require('./donationData')
const messageData = require('./messageData')

db.once('open', async()=>{
try{

  await User.deleteMany({});
  await Donation.deleteMany({})
  await Message.deleteMany({})


const users = User.insertMany(userData);
const donations =  Donation.insertMany(donationData);
const messages = Message.insertMany(messageData)

  for (newUser of users){
  
    // randomly add a message to each user
    const tempMessage = messages[Math.floor(Math.random() * messages.length)];
    newUser.message = tempMessage._id;
    await newUser.save();
    
    // reference message on user model, too
    tempMessage.users.push(newUser._id);
    await tempMessage.save();

    //randomly add a donation to each user
    const tempDonation = donations[Math.floor(Math.random() * donations.length)];
    newUser.donation = tempDonation._id;
    await newUser.save();

    // reference donation on user model, too
    tempDonation.users.push(newUser._id);
    await tempDonation.save();

  }


  console.log('all done!');
  process.exit(0);

}
catch (err) {
  throw err;
}

}); 



