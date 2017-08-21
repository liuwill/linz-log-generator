var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var ipUtils = require('../../').utils
var demoRule = require('../../config/demoRule')
var generateLogFromCurl = require('../../').generateLogFromCurl

var sampleCurl = "curl 'http://test-va.sample.com/track/va.gif?cat=52&s=3&ver=3&n=66938233&ch=59892d9c6ac86a69663696ef&proj=58f6ca0e0c11a5036bb7a8de&br=&rs=854x480&lang=zh-CN&dr=0&y=0&x=0&sdk=dev&bu=videoos&bu-ser=2.0&a=H1PG9rNCl&v=58f6cbba0c11a5036bb7aa6d&c=5965dd372106c56e65fc7b67&ssid=ByJ3nRD_-Hyxknh0DOW&ad=5987ea82722da4b0ddff667c&tag=5987ea82722da4b0ddff667c&dg=58f6ca0e0c11a5036bb7a8f1&t=2&adflow=59891a11722da4b0ddff66f8' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: zh-CN,zh;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3188.2 Safari/537.36' -H 'Accept: image/webp,image/apng,image/*,*/*;q=0.8' -H 'Referer: http://www.qq.com' -H 'Connection: keep-alive' --compressed"

describe('#index', function () {

  describe('#generateLogFromCurl()', function () {
    it('should generate log string', function () {
      var mockIp = ipUtils.generateRandomIp()
      var logResult = generateLogFromCurl(mockIp, sampleCurl, demoRule)

      assert.isString(logResult)

      var logData = logResult.split(demoRule.separator)

      if (demoRule.created) {
        expect(logData).to.have.length(demoRule.sequence.length + 1)
      } else {
        expect(logData).to.have.length(demoRule.sequence.length)
      }
    })
  })

})
