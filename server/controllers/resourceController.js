const { Resource } = require('../models');

module.exports = {
  async getAllResources(req, res) {
    try {
      // use Mongoose's .find() method to retrieve all resources from the database into obj
      const resources = await Resource.find({});
      res.json(resources);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getOneResource({ params }, res) {
    try {
      // use Mongoose's .findById() method to retrieve a single resource by its id
      const resource = await Resource.findById(params.id);
      if (!resource) {
        res.status(404).json({ message: 'No resources found!' });
        return;
      }
      res.json(resource);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = resourceController;
