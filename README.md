# Knock [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Knock javascript client for browser.


## Getting started

### Usage

```
$ npm install --save knock
```

```js
import Knock from 'knock';

const knock = new Knock('ws://io.example.com:3000/');
const channel = knock.subscribe('events');

channel.on('notification', (data) => {
  console.log(data);
});
```


## License

MIT © [Scalex Systems](Http://opensource.scalex.xyz/)


[npm-image]: https://badge.fury.io/js/knock-js.svg
[npm-url]: https://npmjs.org/package/knock-js
[travis-image]: https://travis-ci.org/zerohq/knock-js.svg?branch=master
[travis-url]: https://travis-ci.org/zerohq/knock-js
[daviddm-image]: https://david-dm.org/zerohq/knock-js.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zerohq/knock-js
[coveralls-image]: https://coveralls.io/repos/zerohq/knock-js/badge.svg
[coveralls-url]: https://coveralls.io/r/zerohq/knock-js
