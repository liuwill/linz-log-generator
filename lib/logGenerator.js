function generateRequestLog(ip, requestContext, handleRule) {
  var headers = requestContext.headers
  var queryParams = requestContext.query

  var headerParams = {}
  headerParams['user-agent'] = getUserAgent(headers)
  headerParams['referer'] = getReference(headers)

  var currentTime = (new Date()).toISOString()
  var logList = []

  var ruleField = ['sequence', 'created', 'separator', 'relation']
  if (!handleRule) {
    throw new Error()
  } else {
    for (var ruleIndex in ruleField) {
      var ruleKey = ruleField[ruleIndex]
      if (typeof handleRule[ruleKey] === 'undefined') {
        throw new Error()
      }
    }
  }

  if (handleRule.created === true) {
    logList.push(currentTime)
  }

  for (var i in handleRule.sequence) {
    var key = handleRule.sequence[i]
    if (key in handleRule.relation) {
      var relateData = handleRule.relation[key]
      if (relateData.type === 'IP') {
        logList.push(ip)
      } else if (relateData.type === 'headers') {
        var headerKey = relateData.key
        logList.push(headerParams[headerKey])
      } else {
        throw new Error()
      }
    } else {
      if (queryParams[key]) {
        logList.push(queryParams[key])
      } else {
        logList.push('')
      }
    }
  }
  return logList.join(handleRule.separator)
}

function getUserAgent(headers) {
  return headers['user-agent'] ? headers['user-agent'] : 'UNKNOWN'
}

function getReference(headers) {
  return headers['referer'] ? headers['referer'] : ''
}

exports.generateRequestLog = generateRequestLog
