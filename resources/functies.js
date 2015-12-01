exports = module.exports = function (roa) {
  'use strict';
  var sri4node = roa;

  return {
    resource: function () {

      var $s = sri4node.schemaUtils;
      var $q = sri4node.queryUtils;
      var $m = sri4node.mapUtils;

      return { //eslint-disable-line
        type: '/functies',
        public: true,
        cache: {
          ttl: 120,
          type: 'local'
        },
        schema: {
          $schema: 'http://json-schema.org/schema#',
          title: 'Functie',
          description: 'A functie resource',
          type: 'object',
          properties: {
            key: $s.string('GUID for this document.'),
            name: $s.string('Name of the function'),
            description: $s.string('Description of the function')
          },
          required: ['key', 'name']
        },
        validate: [],
        query: {
          defaultFilter: $q.defaultFilter
        },
        map: {
          key: {},
          name: {},
          description: {onread: $m.removeifnull}
        }
      };
    }
  };
};
