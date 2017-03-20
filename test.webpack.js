// we run into an issue with `fetch-mock` being called/required
// before `isomorphic-fetch`, causing some ambigious errors and
// failing every test that uses both. including `isomorphic-fetch`
// here ensures that it will be defined first.
// see: https://github.com/wheresrhys/fetch-mock/issues/60
require('isomorphic-fetch')

var srcContext = require.context('./src', true, /-test\.jsx?$/)
srcContext.keys().forEach(srcContext)

var libContext = require.context('./lib', true, /-test\.jsx?$/)
libContext.keys().forEach(libContext)

