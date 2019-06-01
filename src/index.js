const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PlacesRouter = require('./routers/PlacesRouter');

const app = express();
express.Router();
 
dotenv.config();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('*', cors())

/**
 * @api {post} /places/search/locations 
 * @apiName Locations
 *
 * @apiParam {queryItems} Array of locations.
 *
 * @apiSuccess {Json} json with pair of locations and closest location from the same array.
 */
app.use('/places', PlacesRouter);

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

