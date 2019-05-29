import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

import PlacesRouter from './routers/PlacesRouter';

const app = express();
const router = express.Router();
 
const port = process.env.PORT || '3000';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoints
app.use('/places', PlacesRouter);

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
});

