const express = require('express');
const PlacesController = require('../controllers/PlacesController');

const PlacesRouter = express.Router(); 

PlacesRouter.post('/search', PlacesController.getLocations);

module.exports = PlacesRouter; 