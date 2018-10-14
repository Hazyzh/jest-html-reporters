module.exports = {
  process(src, filename, config, options) {
    return "const enUS = require('./en-US').default; module.exports = async function loadLocale() { return enUS; };"
  },
}
