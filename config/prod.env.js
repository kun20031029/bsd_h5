'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env')
// module.exports = {
//   NODE_ENV: '"production"'
// }
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  VUE_APP_BASE_API: '"http://bsd.fckvip.cn:8080/"'
})
