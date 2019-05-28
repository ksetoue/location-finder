// 'use strict'

import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';


const server = express();
// const normalizePort = require('normalize-port');
 
const port = process.env.PORT || '3000';

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/getPlaces', (req, res) => {
    // change to call router 
    console.log(req.body);
    res.send('hello');
});

server.listen(port, function () {
    console.log(`App listening on port ${port}`);
});