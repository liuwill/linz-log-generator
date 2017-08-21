var requestParser = require('./lib/requestParser.js')
var logGenerator = require('./lib/logGenerator.js')
var utils = require('./lib/utils.js')

exports.requestParser = requestParser
exports.logGenerator = logGenerator
exports.utils = utils

exports.generateLogFromCurl = function (ip, curlScript, demoRule) {
  var parsedRequest = requestParser.generateRequest(curlScript)

  var logResult = logGenerator.generateRequestLog(ip, parsedRequest, demoRule)
  return logResult
}
