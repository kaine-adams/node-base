const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const config = require('config');
const helmet = require('helmet');

//pre-configuration
app.use(helmet());

//setup static assets
app.use('/', express.static(__dirname + '/public'));

//configure templates
app.locals.basedir = path.join(__dirname , "template");
app.set("views", path.join(__dirname , "template/view"));
app.set("view engine", "pug");

//set hosted port
app.set('port', config.server.port);


state  = {config, app, io};

require('passport-setup')(state);
require('routes')(state);

//start server
server.listen(config.server.port);
