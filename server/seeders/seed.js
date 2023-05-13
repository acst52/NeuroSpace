const db = require('../config/connection')
const { User,Donation,Message } = require('../models');

const userData = require('./userData')
const donationData = require('./donationData')
const messageData = require('./messageData')

db.once('open', async()=>{
// try{

  await User.deleteMany({});
  await Donation.deleteMany({})
  await Message.deleteMany({})


const users = await User.insertMany(userData);
const donations =  await Donation.insertMany(donationData);
const messages = await Message.insertMany(messageData)

// get two arrays 
let messageArray = await Message.find()
let donationArray = await Donation.find()
let userArray = await User.find()
  // for (newUser of users){
  
  //   const tempMessage = messageArray[Math.floor(Math.random() * messages.length)];
  //   // reference message on user model, too
  //   newUser.messages.push(tempMessage);


  //   //randomly add a donation to each user
  //   const tempDonation = donationArray[Math.floor(Math.random() * donations.length)];
  //   // reference donation on user model, too
  //   newUser.donations.push(tempDonation);

  //   await newUser.save();

  // }
  console.log(userArray)

  for (newUser of userArray) {
      const sender = userArray[Math.floor(Math.random() * userArray.length)]
      const recipient = userArray[Math.floor(Math.random() * userArray.length)]
      const tempMessage = messageArray[Math.floor(Math.random() * messages.length)];
      tempMessage.sender = sender._id
      tempMessage.recipient = recipient._id
      await tempMessage.save()
      //when we are using Objectid, we need to push only id
      newUser.messages.push(tempMessage._id);

      const tempDonation = donationArray[Math.floor(Math.random() * donations.length)];
newUser.donations.push(tempDonation._id);

      await newUser.save();

  }


  console.log('all done!');
  process.exit(0);

// }
// catch (err) {
//   throw err;
// }

}); 



