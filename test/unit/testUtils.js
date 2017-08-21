var chai = require('chai')

chai.should()
var expect = chai.expect
var assert = chai.assert

var ipUtils = require('../../').utils

describe('#ipUtils', function () {

  describe('#generateRandIpBit()', function () {
    it('should generate ip bit', function () {
      for(var i = 0; i < 10; i++){
        var randBit = ipUtils.generateRandIpBit()

        assert.isNumber(randBit)
        expect(randBit).to.be.greaterThan(0)
        expect(randBit).to.be.lessThan(255)
      }
    })
  })

  describe('#generateRandomIp()', function () {
    it('should generate random ip', function () {
      for(var i = 0; i < 5; i++){
        var randIp = ipUtils.generateRandomIp()

        assert.isString(randIp)

        var ipBits = randIp.split('.')
        expect(ipBits).to.have.length(4)

        assert.isNotNaN(parseInt(ipBits[0]))
      }
    })
  })

})
