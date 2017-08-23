# linz-log-generator
  [![Build Status][travis-image]][travis-url]
  [![NPM version][npm-image]][npm-url]
  [![Code Climate][quality-image]][quality-url]
  [![Codecov branch][codecov-image]][codecov-url]

just generate log from curl code, we could define generate rule for our log.

## install

``` shell
npm install --save linz-log-generator
```

## example

```javascript
const logGenerator = require('linz-log-generator')
var ipUtils = logGenerator.utils
var demoRule = { /* ... config rule ... */ }
var generateLogFromCurl = logGenerator.generateLogFromCurl

var sampleCurl = ['curl']
sampleCurl.push("'http://test-va.sample.com/va.gif?cat=52&s=3&ver=3&n=66938233&ch=ch1&proj=proj2&br=&rs=854x480&lang=zh-CN&dr=0&y=0&x=0&sdk=dev&bu=videoos&bu-ser=2.0&a=H1PG9rNCl&v=v3&c=cc&tag=t4&dg=d5'")
sampleCurl.push("-H 'Accept-Encoding: gzip, deflate'")
sampleCurl.push("-H 'Accept-Language: zh-CN,zh;q=0.8'")
sampleCurl.push("-H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3188.2 Safari/537.36'")
sampleCurl.push("-H 'Accept: image/webp,image/apng,image/*,*/*;q=0.8'")
sampleCurl.push("-H 'Referer: http://www.qq.com'")
sampleCurl.push("-H 'Connection: keep-alive'")
sampleCurl.push("--compressed")

const resultLog = generateLogFromCurl('127.0.0.1', sampleCurl.join(' '), demoRule)

console.log(resultLog)

/// output
"2017-08-23T09:06:31.443Z	3	52	3	127.0.0.1	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3188.2 Safari/537.36	http://www.qq.com	v3	t4	zh-CN	proj2"
```

配置文件参看：
[config/demoRule.js](./config/demoRule.js)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/linz-log-generator.svg?style=flat-square
[npm-url]: https://npmjs.org/package/linz-log-generator
[travis-image]: https://img.shields.io/travis/liuwill/linz-log-generator/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/liuwill/linz-log-generator
[quality-image]: https://img.shields.io/codeclimate/github/liuwill/linz-log-generator.svg?style=flat-square
[quality-url]: https://codeclimate.com/github/liuwill/linz-log-generator
[appveyor-image]: https://img.shields.io/appveyor/ci/liuwill/linz-log-generator/master.svg?style=flat-square
[appveyor-url]: https://ci.appveyor.com/project/liuwill/linz-log-generator
[codecov-image]: https://img.shields.io/codecov/c/github/liuwill/linz-log-generator.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/liuwill/linz-log-generator
