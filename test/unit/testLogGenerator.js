var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var requestParser = require('../../').requestParser
var logGenerator = require('../../').logGenerator
var ipUtils = require('../../').utils
var demoRule = require('../../config/demoRule')

var sampleCurl = "curl 'http://test-va.sample.com/track/va.gif?cat=52&s=3&ver=3&n=66938233&ch=59892d9c6ac86a69663696ef&proj=58f6ca0e0c11a5036bb7a8de&br=&rs=854x480&lang=zh-CN&dr=0&y=0&x=0&sdk=dev&bu=videoos&bu-ser=2.0&a=H1PG9rNCl&v=58f6cbba0c11a5036bb7aa6d&c=5965dd372106c56e65fc7b67&ssid=ByJ3nRD_-Hyxknh0DOW&ad=5987ea82722da4b0ddff667c&tag=5987ea82722da4b0ddff667c&dg=58f6ca0e0c11a5036bb7a8f1&t=2&adflow=59891a11722da4b0ddff66f8' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: zh-CN,zh;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3188.2 Safari/537.36' -H 'Accept: image/webp,image/apng,image/*,*/*;q=0.8' -H 'Referer: http://www.qq.com' -H 'Connection: keep-alive' --compressed"
var slimCurl = "curl 'http://test-va.sample.com/track/va.gif?cat=52&s=3&ver=3' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: zh-CN,zh;q=0.8' -H 'Accept: image/webp,image/apng,image/*,*/*;q=0.8' -H 'Connection: keep-alive' --compressed"

describe('#logGenerator', function () {

  describe('#generateRequestLog()', function () {
    var parsedRequest = requestParser.generateRequest(sampleCurl)
    var mockIp = ipUtils.generateRandomIp()

    it('should generate log string', function () {
      var logResult = logGenerator.generateRequestLog(mockIp, parsedRequest, demoRule)

      assert.isString(logResult)

      var logData = logResult.split(demoRule.separator)

      if (demoRule.created) {
        expect(logData).to.have.length(demoRule.sequence.length + 1)
      } else {
        expect(logData).to.have.length(demoRule.sequence.length)
      }
    })

    it('should throw error', function () {
      var errorRule = {
        sequence: ["ver", "cat", "s", "ip", "ua"],
        relation: {
          ip: {
            type: 'other'
          }
        },
        separator: '\t',
        created: true
      }
      errorRule.relation['cat'] = { type: 'other' }

      expect(function () {
        logGenerator.generateRequestLog(mockIp, parsedRequest)
      }).to.throw()

      expect(function () {
        logGenerator.generateRequestLog(mockIp, parsedRequest, {})
      }).to.throw()

      expect(function () {
        logGenerator.generateRequestLog(mockIp, parsedRequest, errorRule)
      }).to.throw()
    })

    it('should handle branch', function () {
      var slimRequest = requestParser.generateRequest(slimCurl)

      var customRule = {}
      for (var key in demoRule) {
        customRule[key] = demoRule[key]
      }
      customRule['created'] = false

      var logResult = logGenerator.generateRequestLog(mockIp, slimRequest, customRule)
      var logData = logResult.split(customRule.separator)
      expect(logData).to.have.length(customRule.sequence.length)
    })
  })

})
