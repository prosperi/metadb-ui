require('es6-promise').polyfill()
import 'isomorphic-fetch'

var srcContext = require.context('./src', true, /-test\.jsx?$/)
srcContext.keys().forEach(srcContext)

var libContext = require.context('./lib', true, /-test\.jsx?$/)
libContext.keys().forEach(libContext)

