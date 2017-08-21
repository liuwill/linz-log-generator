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

exports.generateRandIpBit = generateRandIpBit
exports.generateRandomIp = generateRandomIp
