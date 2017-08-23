function generateRandIpBit() {
  return Math.ceil(Math.random() * 254)
}

function generateRandomIp() {
  var ipData = []
  while (ipData.length < 4) {
    var randBit = generateRandIpBit()
    ipData.push(randBit)
  }

  return ipData.join('.')
}

function trimString(str) {
  var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000'
  for (var i = 0, len = str.length; i < len; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i)
      break
    }
  }

  for (var j = str.length - 1; j >= 0; j--) {
    if (whitespace.indexOf(str.charAt(j)) === -1) {
      str = str.substring(0, j + 1)
      break
    }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}

exports.trimString = trimString
exports.generateRandIpBit = generateRandIpBit
exports.generateRandomIp = generateRandomIp
