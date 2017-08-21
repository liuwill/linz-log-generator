var chai = require('chai')
var yargsParser = require('yargs-parser')

chai.should()
var expect = chai.expect
var assert = chai.assert

var requestParser = require('../../').requestParser

var sampleCurl = "curl 'http://test-va.sample.com/track/va.gif?cat=52&s=3&ver=3&n=66938233&ch=59892d9c6ac86a69663696ef&proj=58f6ca0e0c11a5036bb7a8de&br=&rs=854x480&lang=zh-CN&dr=0&y=0&x=0&sdk=dev&bu=videoos&bu-ser=2.0&a=H1PG9rNCl&v=58f6cbba0c11a5036bb7aa6d&c=5965dd372106c56e65fc7b67&ssid=ByJ3nRD_-Hyxknh0DOW&ad=5987ea82722da4b0ddff667c&tag=5987ea82722da4b0ddff667c&dg=58f6ca0e0c11a5036bb7a8f1&t=2&adflow=59891a11722da4b0ddff66f8' -H 'Accept-Encoding: gzip, deflate' -H 'Accept-Language: zh-CN,zh;q=0.8' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3188.2 Safari/537.36' -H 'Accept: image/webp,image/apng,image/*,*/*;q=0.8' -H 'Referer: http://www.qq.com' -H 'Connection: keep-alive' --compressed"
var sampleUrl = 'http://test-va.sample.com/track/va.gif?cat=52&s=3&ver=3&n=66938233&ch=59892d9c6ac86a69663696ef&proj=58f6ca0e0c11a5036bb7a8de&br=&rs=854x480&lang=zh-CN&dr=0&y=0&x=0&sdk=dev&bu=videoos&bu-ser=2.0&a=H1PG9rNCl&v=58f6cbba0c11a5036bb7aa6d&c=5965dd372106c56e65fc7b67&ssid=ByJ3nRD_-Hyxknh0DOW&ad=5987ea82722da4b0ddff667c&tag=5987ea82722da4b0ddff667c&dg=58f6ca0e0c11a5036bb7a8f1&t=2&adflow=59891a11722da4b0ddff66f8'

describe('#requestParser', function () {
  describe('#parseCurlToRequest()', function () {
    it('should parse curl command', function () {
      var parseResult = requestParser.parseCurlToRequest(sampleCurl)

      assert.isObject(parseResult)
      expect(parseResult).to.have.property('url', sampleUrl)
      expect(parseResult).to.have.property('compressed', true)
      expect(parseResult).to.have.property('headers').that.is.a('object')
      expect(function () { requestParser.parseCurlToRequest(sampleUrl) }).to.throw()
    })
  })

  describe('#parseCurlToRequest()', function () {
    it('should parse url params', function () {
      var urlResult = requestParser.parseRequestParams(sampleUrl)

      assert.isObject(urlResult)
      expect(urlResult).to.have.property('lang', 'zh-CN')
    })

    it('should parse sample params', function () {
      var simpleParams = "foo=bar&hello=world"
      var urlResult = requestParser.parseRequestParams(simpleParams)

      assert.isObject(urlResult)
      expect(urlResult).to.have.property('foo', 'bar')
      expect(urlResult).to.have.property('hello', 'world')
    })
  })

  describe('#parseHeadersFromCurl()', function () {
    it('should parse parse headers', function () {
      var argvObj = yargsParser(sampleCurl)
      var headerResult = requestParser.parseHeadersFromCurl(argvObj.H)

      assert.isObject(headerResult)
      expect(headerResult).to.have.property('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3188.2 Safari/537.36')
    })
  })

  describe('#parseRequestRoute()', function () {
    it('should parse pure url', function () {
      var simplePath = "http://test-va.sample.com/track/va.gif"
      var resultPath = requestParser.parseRequestRoute(simplePath)

      assert.isString(resultPath)
      expect(simplePath).to.be.equal(resultPath)
    })
  })

  describe('#generateRequest()', function () {
    it('should generate we need request', function () {
      var requestResult = requestParser.generateRequest(sampleCurl)

      assert.isObject(requestResult)
      expect(requestResult).to.have.property('url', sampleUrl)
      expect(requestResult).to.have.property('compressed', true)
      expect(requestResult).to.have.property('headers').that.is.a('object')

      expect(requestResult).to.have.property('path', 'http://test-va.sample.com/track/va.gif')
    })
  })
})
