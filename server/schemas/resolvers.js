// WILL OBVIOUSLY NEED TO ADD MORE, BELOW IS JUST FROM STRIPE CLASS NOTES!

// add order create order - incl spot for price to be passed

const { AuthenticationError } = require('apollo-server-express');
const {
  User,
  Order,
  Schedule,
  Product,
  Message,
  Donation,
} = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  // Queries
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

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
        return await Schedule.findOne({ _id, owner: context.user._id });
      }
      throw new AuthenticationError('Not logged in');
    },
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
      const user = await User.findById(context.user._id).populate({
        path: 'orders.products',
        populate: 'category',
      });

      return user.orders.id(_id);
    }

    throw new AuthenticationError('Not logged in');
  },

  checkout: async (parent, args, context) => {
    const url = new URL(context.headers.referer).origin;
    const order = new Order({ products: args.products });
    const line_items = [];

    const { products } = await order.populate('products');

    for (let i = 0; i < products.length; i++) {
      const product = await stripe.products.create({
        name: products[i].name,
        description: products[i].description,
        images: [`${url}/images/${products[i].image}`],
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: products[i].price * 100,
        currency: 'usd',
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

  // Mutations
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
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
    // ADD MUTATIONS FOR updateSchedule, deleteSchedule, createEvent, updateEvent, deleteEvent, addUserToEvent, and removeUserFromEvent

    // Msg & Donation feature mutations
    createMessage: async (parent, { sender, receiver, content }) => {
      return await Message.create({ sender, receiver, content });
    },
    deleteMessage: async (parent, { _id }) => {
      return await Message.findOneAndDelete({ _id });
    },

    createDonation: async (parent, { user, description, amount }) => {
      return await Donation.create({ user, description, amount });
    },
    updateDonation: async (parent, { _id, amount }) => {
      return await Donation.findOneAndUpdate(_id, { amount }, { new: true });
    },
    deleteDonation: async (parent, { _id }) => {
      return await Donation.findOneAndDelete({ _id });
    },

    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError('Not logged in');
    },

    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
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
  },
};

module.exports = resolvers;
