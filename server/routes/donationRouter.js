const express = require('express');
const router = express.Router();
const { Donation } = require('../models');

// GET all donations
router.get('/', async (req, res) => {
  try {
    const don = await Donation.find();
    res.json(don);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET donation by id
router.get('/:id', async (req, res) => {
  try {
    const don = await Donation.findById(req.params.id);
    if (!don) {
      res.status(404).json({ message: 'Donation not found!' });
      return;
    }
    res.json(don);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE (POST) new donation
router.post('/', async (req, res) => {
  try {
    const don = await Donation.create(req.body);
    res.status(201).json(don);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE (PUT) donation by id
router.put('/:id', async (req, res) => {
  try {
    const don = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!don) {
      res.status(404).json({ message: 'Donation not found!' });
      return;
    }
    res.json(don);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE donation by id
router.delete('/:id', async (req, res) => {
  try {
    const don = await Donation.findByIdAndDelete(req.params.id);
    if (!don) {
      res.status(404).json({ message: 'Donation not found!' });
      return;
    }
    res.json(don);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
