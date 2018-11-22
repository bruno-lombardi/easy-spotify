# EasySpotify - A Spotify JavaScript Wrapper

This is a JavaScript library that wraps around (Spotify Web Api)[https://developer.spotify.com/documentation/web-api/] to make your life easier.

## Browser Support

This library relies on [Fetch API](https://fetch.spec.whatwg.org/). And this API is supported in the following browsers:

![Chrome](https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_128x128.png) | ![Firefox](https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_128x128.png) | ![Opera](https://github.com/alrra/browser-logos/raw/master/src/opera/opera_128x128.png) | ![Safari](https://github.com/alrra/browser-logos/raw/master/src/safari/safari_128x128.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Edge](https://github.com/alrra/browser-logos/raw/master/src/edge/edge_128x128.png) | ![iOSSafari](https://github.com/alrra/browser-logos/raw/master/src/safari-ios/safari-ios_128x128.png) |
--- | --- | --- | --- | --- | --- | --- |
42+ ✔ | 40+ ✔ | 29+ ✔ | 10.1+ ✔ | Nope ✘ | 14+ ✔ | 10.3+ ✔ |

For more detailed support, [see caniuse.com](https://caniuse.com/#feat=fetch)

## Dependencies

This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests. For environments that don't support fetch, you'll need to provide a [browser polyfill](https://github.com/github/fetch) or [NodeJS polyfill](https://github.com/bitinn/node-fetch), depending on what you want.

### Installing for NodeJS

First install the polyfill with `sh $ npm install node-fetch --save`, then install the library with `sh $ npm install easy-spotify --save`. You are then ready to use it.

### Installing for browser

Please refer to the [browser polyfill](https://github.com/github/fetch) and download and include it in your scripts. Remember this is only a polyfill, you don't need if you don't want to support old browsers. 

## How to use

More details soon... big sorry!

## Built With

* Webpack
* VSCode

## Authors

| ![Bruno Lombardi](https://avatars2.githubusercontent.com/u/7153294?s=460&v=4)|
|:---------------------:|
|  [Bruno Lombardi](https://github.com/bruno-lombardi)   |

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* 1000 thanks to [Willian Justen](https://github.com/willianjusten/) who teachs everything about how to make this library in his awesome [Udemy Course](https://www.udemy.com/js-com-tdd-na-pratica/), only portuguese :(
* The whole project this code is based on, [spotify-wrapper](https://github.com/willianjusten/spotify-wrapper)
