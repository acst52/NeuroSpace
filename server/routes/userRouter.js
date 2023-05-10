const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found!' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE (POST) new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE (PUT) user by id
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(404).json({ message: 'Schedule not found!' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE user by id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Schedule not found!' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
