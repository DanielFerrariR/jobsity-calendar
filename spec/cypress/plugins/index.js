const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  const options = {
    webpackOptions: require('../../../webpack.config.cypress'),
    watchOptions: {}
  }

  on('file:preprocessor', webpackPreprocessor(options))
  require('@cypress/code-coverage/task')(on, config)
  require('cypress-log-to-output').install(on, (type, event) => {
    if (event.level === 'error' || event.type === 'error') {
      return true
    }

    return false
  })

  return config
}
