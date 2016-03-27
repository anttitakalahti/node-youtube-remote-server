'use strict';

const env = require('../env.json');
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  host: env ? env.host : 'localhost',
  port: env ? env.port : 8000
});

server.register([
  { register: require('./plugins/active-window-title') }
], function(error) {
  if (error) {
    console.error('Failed to load a plugin:', error);
  }
});

server.start(function(error) {
  if (error) {
    throw error;
  }
  console.log('Server running at:', server.info.uri);
});

module.exports = server;