exports = module.exports = function (roa) {
  'use strict';
  var sri4node = roa;

  return {
    resource: function () {

      var $s = sri4node.schemaUtils;
      var $q = sri4node.queryUtils;
      var $m = sri4node.mapUtils;

      return { //eslint-disable-line
        type: '/responsibilities',
        public: true,
        cache: {
          ttl: 120,
          type: 'local'
        },
        schema: {
          $schema: 'http://json-schema.org/schema#',
          title: 'Responsibility',
          description: 'A relationship between a persoon and a functie',
          type: 'object',
          properties: {
            key: $s.string('GUID for this document.'),
            persoon: $s.permalink('/personen', 'Person of the Responsibility'),
            functie: $s.permalink('/functies', 'Functie of the Responsibility'),
            from: {
              type: 'string',
              format: 'date',
              description: 'Validity start date of the responsibility.'
            },
            to: {
              type: 'string',
              format: 'date',
              description: 'Validity end date of the responsibility.'
            }
          },
          required: ['key', 'persoon', 'functie']
        },
        validate: [],
        query: {
          defaultFilter: $q.defaultFilter
        },
        map: {
          key: {},
          persoon: {references: '/personen'},
          functie: {references: '/functies'},
          from: {onread: $m.removeifnull},
          to: {onread: $m.removeifnull}
        }
      };
    }
  };
};
