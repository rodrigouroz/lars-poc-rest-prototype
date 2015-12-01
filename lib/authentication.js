var Q = require('q');

module.exports = {

  testAuthenticator: function (db, username, password) {
    'use strict';
    return Q.fcall(function () { return true; });
  },

  getMe: function (req, database) {
    'use strict';
    var me = {
      username: 'lars_poc'
    };
    return Q.fcall(function () { return me; });
  }

};
