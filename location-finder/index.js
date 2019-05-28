'use strict'

import { express } from 'express';
import { bodyParser } from 'body-parser';

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/getPlaces', (req, res) => {
    // change to call router 
    console.log(req.body);
    res.send('hello');
});


server.listen(3000, function () {
    console.log('App listening on port 3000');
});