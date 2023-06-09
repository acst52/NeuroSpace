// WILL OBVIOUSLY NEED TO ADD MORE, BELOW IS JUST FROM STRIPE CLASS NOTES!

// add order create order - incl spot for price to be passed

// ...and the Resolvers: queries are the R of CRUD operations, while the mutations are what you call in the front end (using the hook) to do the things and define how you want to do them, based on what args + what you have set to be returned in the typeDefs

// context holds user info in Apollo Server

const { AuthenticationError } = require('apollo-server-express');
const {
  User,
  Order,
  Schedule,
  Resource,
  Message,
  Donation,
  Event,
} = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  // Queries - like the R of CRUD
  Query: {
    resources: async (parent, { category, title }) => {
      const params = {};
      if (category) {
        params.category = category;
      }
      if (title) {
        params.title = title;
      }
      return await Resource.find(params);
    },

    resource: async (parent, { _id }) => {
      return await Resource.find(_id);
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    schedules: async (parent, args, context) => {
      if (context.user) {
        return await Schedule.find({ owner: context.user._id });
      }
      throw new AuthenticationError('Not logged in');
    },
    schedule: async (parent, { _id }, context) => {
      if (context.user) {
        return await Schedule.findById(_id);
      }
      throw new AuthenticationError('Not logged in');
    },

    event: async (parent, { scheduleId }, context) => {
      if (context.user) {
        const schedule = await Schedule.findOne({ _id: scheduleId }).populate(
          'events'
        );
        return schedule.events;
      }
      throw new AuthenticationError('Not logged in');
    },

    // add for msgs and donation
    messages: async (parent, {}, context) => {
      return await Message.find({
        recipient:context.user._id
      }).populate('sender').populate('recipient');
    },
    message: async (parent, { _id }) => {
      return await Message.findById(_id)
      .populate('sender')
      .populate('recipient');
  },

    users: async () => {
      return await User.find();
    },


    donations: async () => {
      return await Donation.find();
    },
    donation: async (parent, { _id }) => {
      return await Donation.findById(_id);
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        // find user by id if user is logged in, return user's orders . id, id is passed to query. if user not logged in, err
        const user = await User.findById(context.user._id);
        return user.orders.id(_id);
      }
      throw new AuthenticationError('Not logged in');
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ donations: args.donations });
      const line_items = [];

      const { donations } = await order.populate('donations');

      for (let i = 0; i < donations.length; i++) {
        const donation = await stripe.donation.create({
          name: donation[i].name,
          description: donation[i].description,
          images: [`${url}/images/${donation[i].image}`],
        });

        const price = await stripe.prices.create({
          donation: donation.id,
          unit_amount: donation[i].price * 100,
          currency: 'cad',
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  // Mutations - like the C U D of CRUD
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }
      throw new AuthenticationError('Not logged in');
    },

    createSchedule: async (parent, { weekStartDate }, context) => {
      if (context.user) {
        const schedule = await Schedule.create({
          weekStartDate,
          owner: context.user._id,
        });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { schedules: schedule },
        });
        return schedule;
      }
      throw new AuthenticationError('Not logged in');
    },

    createEvent: async (
      parent,
      { title, description, startDate, endDate, scheduleId, attendees },
      context
    ) => {
      if (context.user) {
        const event = await Event.create({
          title,
          description,
          startDate,
          endDate,
          scheduleId,
          attendees,
        });
        if (attendees && attendees.length > 0) {
          for (const attendeeId of attendees) {
            const user = await User.findById(attendeeId);
            if (user && user.schedules && user.schedules.length > 0) {
              const scheduleIdAttendee = user.schedules[0].id;
              await Schedule.findByIdAndUpdate(scheduleIdAttendee, {
                $push: { events: event },
              });
            }
          }
        }
        await Schedule.findByIdAndUpdate(event.scheduleId, {
          $push: { events: event },
        });
        return event;
      }
      throw new AuthenticationError('Not logged in');
    },

    deleteEvent: async (_, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findById(eventId);

        if (event) {
          const scheduleId = context.user.scheduleId;
          // Remove the event from the related schedule
          await Schedule.findByIdAndUpdate(
            scheduleId,
            {
              $pull: { events: { _id: eventId } },
            },
            { new: true }
          );

          // Remove the event itself
          await Event.findByIdAndDelete(eventId);

          // return true; // Return a success status if the deletion is successful
        } else {
          throw new Error('Event not found');
        }
      } else {
        throw new AuthenticationError('Not logged in');
      }
    },

    addCollaboratorToSchedule: async (_, { scheduleId, userId }, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          'You must be logged in to add someone to your schedule!'
        );
      }
      const schedule = await Schedule.findById(scheduleId);
      if (!schedule) {
        throw new UserInputError('Schedule not found!');
      }

      schedule.collaborator.push(userId);
      await schedule.save();
      return schedule;
    },

    // updateSchedule

    // deleteSchedule

    // updateEvent

    // addUserToEvent

    // removeUserFromEvent

    //     createMessage: async (parent, { sender, receiver, content }) => {
    //       return await Message.create({ sender, receiver, content });
    //     },

    //     deleteMessage: async (parent, { _id }) => {
    //       return await Message.findOneAndDelete({ _id });
    //     },

    //     createDonation: async (parent, { user, description, amount }) => {
    //       return await Donation.create({ user, description, amount });
    //     },

    updateDonation: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;
      return await Donation.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    //     deleteDonation: async (parent, { _id }) => {
    //       return await Donation.findOneAndDelete({ _id });
    //     },


      // console.log(context);
      // sentMessage: async (parent, {messageId,senderId}, context) => {
      //   const sendMessage = await Message.findById(messageId)
      //   if(!message){
      //     throw new UserInputError('Message is not found!');
      //   }
      //   sendMessage.push(messageId)
      //   sendMessage.sender.push(senderId)
      //   await sendMessage.save()
      
      //   return sendMessage;
      // },
      
      // receivedMessages: async () => {
      //   return await Message.find();
      // },
      
      // receivedMessage: async (parent, {messageId,recepientId,senderId}, context) => {
      //   const receiveMessage = await Message.findById(messageId)
      //   if(!message){
      //     throw new UserInputError('Message is not found!');
      //   }
      //   receiveMessage.push(messageId)
      //   receiveMessage.recepient.push(recepientId)
      //   await receiveMessage.save()
      
      //   return receiveMessage;
      // },

              // await User.findOneAndUpdate(context.user.sender._id, {
        //   $push: { Message: newMessage },

        // });
        // await User.findByIdAndUpdate(context.user.recipient._id, {
        //   $push: { Message: newMessage },

        // });

      // Once the message is created, it can then be pushed to the user. Via findOneAndUpdate method
      //So now the backend needs to take a recipient ID, then when it creates a message, the Sender User us updated and the message is pushed to the sendMessage field. And then the Recipient User is updated and pushed to the recieveMessage

      createMessage: async (parent, { content, recipient }, context) => {
        if (context.user._id && recipient) {
          const newMessage = await Message.create({
            content,
            sender: context.user._id,
            recipient: recipient,
          });
  
          const sendUser = await User.findById(context.user._id);
          const sendUserMesid = sendUser.sentMessage;
          await User.findByIdAndUpdate(context.user._id, {
            sentMessage: [...sendUserMesid, newMessage._id],
          });
          const reUser = await User.findById(recipient);
          const reUserMesid = reUser.receivedMessage;
          await User.findByIdAndUpdate(recipient, {
            receivedMessage: [...reUserMesid, newMessage._id],
          });
          return newMessage;
        }
        throw new AuthenticationError('Not logged in');
      },

    // createMessage: async (_, { content }, context) => {
    //   console.log(context);
    //   if (context.user) {
    //     const newMessage = new Message({ content });
    //     await User.findByIdAndUpdate(context.user._id, {
    //       $push: { messages: newMessage },
    //     });
    //     return newMessage;
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },

    addOrder: async (parent, { donations }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ donations });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
