const path = require('path');
const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  cookie: 'lang',
  autoReload: true,
  updateFiles: false,
});

module.exports = i18n;

