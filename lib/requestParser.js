var yargsParser = require('yargs-parser')
var querystring = require('querystring')

function parseCurlToRequest(curlStr) {
  var argvObj = yargsParser(curlStr)
  if (!argvObj._.length || argvObj._[0] !== 'curl') {
    throw new Error('curl')
  }

  var curlData = {
    url: argvObj._[1],
    headers: parseHeadersFromCurl(argvObj.H)
  }

  for (var key in argvObj) {
    if (key !== '_' && key !== 'H') {
      curlData[key] = argvObj[key]
    }
  }

  return curlData
}

function parseRequestParams(requestUrl) {
  var queryParamStr = requestUrl
  var paramPos = requestUrl.indexOf('?')
  if (paramPos >= 0) {
    queryParamStr = requestUrl.substr(paramPos + 1)
  }

  return querystring.parse(queryParamStr)
}

function parseRequestRoute(requestUrl) {
  var paramPos = requestUrl.indexOf('?')
  if (paramPos < 0) {
    return requestUrl
  }

  return requestUrl.substr(0, paramPos)
}

function parseHeadersFromCurl(headerStrList) {
  var headers = {}

  for (var i in headerStrList) {
    var headerStr = headerStrList[i].replace(': ', ':')
    var headerMeta = headerStr.split(':')

    var key = headerMeta[0].toLowerCase()
    headers[key] = headerMeta[1]
  }
  return headers
}

function generateRequest(curlStr) {
  var curlData = parseCurlToRequest(curlStr)
  var queryParam = parseRequestParams(curlData.url)

  curlData['query'] = queryParam
  curlData['path'] = parseRequestRoute(curlData.url)

  curlData['request'] = {
    query: curlData['query'],
    headers: curlData['headers']
  }
  return curlData
}

exports.parseHeadersFromCurl = parseHeadersFromCurl
exports.generateRequest = generateRequest
exports.parseRequestParams = parseRequestParams
exports.parseCurlToRequest = parseCurlToRequest
exports.parseRequestRoute = parseRequestRoute
