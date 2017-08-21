module.exports = {
  sequence: ["ver", "cat", "s", "ip", "ua", "refer", "v", "t", "lang", "a"],
  relation: {
    ip: {
      type: 'IP'
    },
    ua: {
      key: 'user-agent',
      type: 'headers'
    },
    refer: {
      key: 'reference',
      type: 'headers'
    }
  },
  field: [],
  format: '',
  separator: '\t',
  created: true
}
