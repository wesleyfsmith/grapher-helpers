Package.describe({
  name: 'wesleyfsmith:grapher-helpers',
  version: '1.0.5',
  // Brief, one-line summary of the package.
  summary: 'Collection and document helpers for common grapher commands.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/wesleyfsmith/grapher-helpers.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3');
  api.use('ecmascript');
  api.use('cultofcoders:grapher@1.2.4');
  api.use('dburles:collection-helpers@1.1.0');
  api.use('wesleyfsmith:schema-fields@1.0.0');
  api.mainModule('grapher-helpers.js');
});
