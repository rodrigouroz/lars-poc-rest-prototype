exports = module.exports = function (roa) {
  'use strict';
  var sri4node = roa;

  return {
    resource: function () {

      var $s = sri4node.schemaUtils;
      var $q = sri4node.queryUtils;
      var $m = sri4node.mapUtils;

      return { //eslint-disable-line
        type: '/personen',
        public: true,
        cache: {
          ttl: 120,
          type: 'local'
        },
        schema: {
          $schema: 'http://json-schema.org/schema#',
          title: 'Persoon',
          description: 'A persoon resource',
          type: 'object',
          properties: {
            key: $s.string('GUID for this document.'),
            firstname: $s.string('First name of the person'),
            lastname: $s.string('Last name of the person'),
            email: $s.email('Email'),
            registrationnumber: $s.numeric('Registration number'),
            birthdate: {
              type: 'string',
              format: 'date',
              description: 'Date of birth'
            }
          },
          required: ['key', 'registrationnumber']
        },
        validate: [],
        query: {
          defaultFilter: $q.defaultFilter
        },
        map: {
          key: {},
          firstname: {onread: $m.removeifnull},
          lastname: {onread: $m.removeifnull},
          email: {onread: $m.removeifnull},
          registrationnumber: {},
          birthdate: {onread: $m.removeifnull}
        }
      };
    }
  };
};
