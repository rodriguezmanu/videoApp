'use strict';

// Development specific configuration
// =================================
module.exports = {
  seedDB: process.env.SEED || false,

  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080
};