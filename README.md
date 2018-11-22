# EasySpotify - A Spotify JavaScript Wrapper
## This library is currently in development, more features will be added

[![Build Status](https://travis-ci.org/bruno-lombardi/easy-spotify.svg?branch=master)](https://travis-ci.org/bruno-lombardi/easy-spotify)

This is a JavaScript library that wraps [Spotify Web Api](https://developer.spotify.com/documentation/web-api/) to make your life easier.

## Browser Support

This library relies on [Fetch API](https://fetch.spec.whatwg.org/), which is supported in the following browsers:

![Chrome](https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_48x48.png) | ![Firefox](https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_48x48.png) | ![Opera](https://github.com/alrra/browser-logos/raw/master/src/opera/opera_48x48.png) | ![Safari](https://github.com/alrra/browser-logos/raw/master/src/safari/safari_48x48.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Edge](https://github.com/alrra/browser-logos/raw/master/src/edge/edge_48x48.png) | ![iOSSafari](https://github.com/alrra/browser-logos/raw/master/src/safari-ios/safari-ios_48x48.png) |
--- | --- | --- | --- | --- | --- | --- |
42+ ✔ | 40+ ✔ | 29+ ✔ | 10.1+ ✔ | Nope ✘ | 14+ ✔ | 10.3+ ✔ |

For more detailed support, [see caniuse.com](https://caniuse.com/#feat=fetch)

## Dependencies

This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests. For environments that don't support fetch, like NodeJS or old browser, you'll need to provide a [browser polyfill](https://github.com/github/fetch) or a [NodeJS polyfill](https://github.com/bitinn/node-fetch).

### Installing for NodeJS

First install the polyfill with `npm install node-fetch --save`. EasySpotify library will be avaible soon in NPM. I am just finishing some things. To install library use `npm install easy-spotify --save`.

### Installing for browser

Please refer to the [browser polyfill](https://github.com/github/fetch) and download and include it in your scripts. Remember this is only a polyfill, you don't need if you don't want to support old browsers. Then download either the [default](https://raw.githubusercontent.com/bruno-lombardi/easy-spotify/master/dist/easy-spotify.umd.js) or [minified](https://raw.githubusercontent.com/bruno-lombardi/easy-spotify/master/dist/easy-spotify.umd.min.js) version.

## How to use

### ES6

```js
// import the library
import EasySpotify from 'easy-spotify';

const spotify = new EasySpotify({
  token: 'your-token-here'
});

// search for artists
spotify.searchArtists('Incubus').then(data => {
  // do something with the data
});
```

### CommonJS

```js
const EasySpotify = require('easy-spotify');

const spotify = new EasySpotify({});
// do something to get a token
spotify.setToken(token);

// do custom search
spotify.search('track', 'The Beatles').then(data => {
  // do somethin with the data
});
```

### Browser
Import the script

```html
<!-- import default version -->
<script src="spotify-wrapper.umd.js"></script>
<!-- or import minified version -->
<!-- <script src="easy-spotify.umd.min.js"></script> -->
```

```js
const spotify = new EasySpotify({});
// do something to get a token
spotify.setToken(token);

// get an album
spotify.getAlbum('album-id').then(data => {
  // do somethin with the data
});
```

## Methods

This library is still in development (as the documentation), but you can see every method if you use VSCode or other text editor that supports JSDoc.

## Built With

* [Webpack](https://webpack.js.org/)
* [VSCode](https://code.visualstudio.com/)

## Ideas to Implement
- [ ] Add configurations to paginate some requests, like getAlbums, search, searchTracks
- [ ] Support Artists endpoints
- [ ] Support Browse endpoints
- [ ] Support Follow endpoints
- [ ] Support Library endpoints
- [ ] Support Personalization endpoints
- [ ] Support Player endpoints
- [ ] Support Playlists endpoints
- [ ] Support Tracks endpoints
- [ ] Support User Profiles endpoints
- [ ] Find a way to get a OAuth token (don't think that is possible with js only)

## Authors

| ![Bruno Lombardi](https://avatars2.githubusercontent.com/u/7153294?s=150&v=4)|
|:---------------------:|
|  [Bruno Lombardi](https://github.com/bruno-lombardi)   |

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* 1000 thanks to [Willian Justen](https://github.com/willianjusten/) who teachs everything about how to make this library in his awesome [Udemy Course](https://www.udemy.com/js-com-tdd-na-pratica/), only portuguese :(
* The whole project this code is based on, [spotify-wrapper](https://github.com/willianjusten/spotify-wrapper)
