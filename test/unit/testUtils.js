var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var ipUtils = require('../../').utils

describe('#ipUtils', function () {

  describe('#generateRandIpBit()', function () {
    it('should generate ip bit', function () {
      for (var i = 0; i < 10; i++) {
        var randBit = ipUtils.generateRandIpBit()

        assert.isNumber(randBit)
        expect(randBit).to.be.greaterThan(0)
        expect(randBit).to.be.lessThan(255)
      }
    })
  })

  describe('#generateRandomIp()', function () {
    it('should generate random ip', function () {
      for (var i = 0; i < 5; i++) {
        var randIp = ipUtils.generateRandomIp()

        assert.isString(randIp)

        var ipBits = randIp.split('.')
        expect(ipBits).to.have.length(4)

        assert.isNotNaN(parseInt(ipBits[0]))
      }
    })
  })

  describe('#trimString()', function () {
    it('should trim string works', function () {
      var blankStr = ''
      var sampleStr0 = 'http://'
      var sampleStr1 = ' ht tp://'
      var sampleStr2 = 'http://  '
      var sampleStr3 = ' http://2  '

      expect(ipUtils.trimString(blankStr)).to.have.length(blankStr.length)
      expect(ipUtils.trimString(sampleStr0)).to.have.length(sampleStr0.length)
      expect(ipUtils.trimString(sampleStr1)).to.have.length(sampleStr1.length - 1)
      expect(ipUtils.trimString(sampleStr2)).to.have.length(sampleStr2.length - 2)
      expect(ipUtils.trimString(sampleStr3)).to.have.length(sampleStr3.length - 3)
    })
  })
})
