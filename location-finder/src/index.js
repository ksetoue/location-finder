import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

import PlacesRouter from './routers/PlacesRouter';

const app = express();
express.Router();
 
dotenv.config();

const port = process.env.PORT || '3000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoints
app.use('/places', PlacesRouter);

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

