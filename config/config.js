// main config.js file
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// load the config file for the current environment
var config = require('./' + process.env.NODE_ENV + '/config');

// export config
module.exports = config;
