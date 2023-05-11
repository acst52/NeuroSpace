// WILL OBVIOUSLY NEED TO ADD MORE, BELOW IS JUST FROM STRIPE CLASS NOTES!

// add order create order - incl spot for price to be passed

// ...and the Resolvers: queries are the R of CRUD operations, while the mutations are what you call in the front end (using the hook) to do the things and define how you want to do them, based on what args + what you have set to be returned in the typeDefs

const { AuthenticationError } = require('apollo-server-express');
const {
  User,
  Order,
  Schedule,
  Resource,
  Message,
  Donation,
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

    // add for msgs and donation
    messages: async () => {
      return await Message.find();
    },
    message: async (parent, { _id }) => {
      return await Message.findById(_id);
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
    // ADD MUTATIONS FOR
    
    // addUserToSchedule - typeDef: addUserToSchedule(scheduleId: ID!): Schedule
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

    // createEvent

    // updateEvent

    // deleteEvent

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
