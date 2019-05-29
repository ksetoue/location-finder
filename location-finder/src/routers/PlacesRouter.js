import express from 'express';
import PlacesController from '../controllers/PlacesController';

const PlacesRouter = express.Router(); 

PlacesRouter.post('/search', PlacesController.getLocations);

module.exports = PlacesRouter; 