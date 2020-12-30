'use strict';

const mongoose = require('mongoose');
require('dotenv').config({silent: true, path: `${__dirname}/.env`});

//var server = require('./app');
var port = 3200;

var app = require('./app');
var https = require('https');
var fs = require('fs');

var httpsOption = {
    key: fs.readFileSync('./keys/hpvsop.com.key'),
    cert: fs.readFileSync('./keys/hpvsop.com.crt')
};

var httpsServer = https.createServer(httpsOption,app)

console.log(`Running on ${process.env.BASE_PATH}:${port}, connecting to ${process.env.MONGO_URL}`)

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
        httpsServer.listen(port, function(){
            console.log("Server running on port: %d", port)
        })
    },
    err => {
        console.log(err)
    }
);