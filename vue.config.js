const path = require('path')

module.exports = {
  outputDir: 'mySite1',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/base.less')]
    }
  }
}
