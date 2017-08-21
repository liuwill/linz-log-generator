var chai = require('chai')

chai.should()
var expect = chai.expect
// var assert = chai.assert

describe('#decode()', function () {
  it('should recover from a base64 string ', function () {
    var helloWorld = Buffer.from("aGVsbG8gd29ybGQ=", 'base64').toString()
    expect(helloWorld).to.equal("hello world")

    var liuwill = Buffer.from("bGl1d2lsbA==", 'base64').toString()
    expect(liuwill).to.equal("liuwill")
  })

  it('should recover from a hex string ', function () {
    var helloWorld = Buffer.from("68656c6c6f20776f726c64", 'hex').toString()
    expect(helloWorld).to.equal("hello world")

    var liuwill = Buffer.from("6c697577696c6c", 'hex').toString()
    expect(liuwill).to.equal("liuwill")
  })
});
