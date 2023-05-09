// FILE IN PROGRESS. MIX OF CLASS NOTES + OTHER SOURCES*

// import user model
const { User } = require('../models/User');

// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [
        { _id: user ? user._id : params.id },
        { username: params.username },
      ],
    });

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },

  async createUser({ body }, res) {
    try {
      const user = await User.create(body);
      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = signToken(user);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // login user, sign token, send back to `client/src/components/LoginForm.js`
  // {body} is destructured req.body
  async login({ body }, res) {
    try {
      const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Can't find a user with this email!" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }
      const token = signToken(user);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  // *** BELOW IS IN PROGRESS ***
  // get user profile

  async getUserProfile({ user }, res) {
    try {
      const userData = await User.findById(user._id)
        .populate({
          path: 'schedule resources',
          populate: { path: 'user', select: 'firstName lastName' },
        })
        .populate('donations');
      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  // // update user profile
  // const updateUserProfile({ user, body }, res) {
  //   try {
  //     const updatedUser = await User.findByIdAndUpdate(
  //       user._id,
  //       body,
  //       { new: true },
  //     );
  //     res.status(200).json(updatedUser);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // }
};
