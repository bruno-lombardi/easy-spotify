# EasySpotify - A Spotify Web Api JS Wrapper

[![Build Status](https://travis-ci.org/bruno-lombardi/easy-spotify.svg?branch=master)](https://travis-ci.org/bruno-lombardi/easy-spotify)

This is a JavaScript library that wraps [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to make your life easier.

## Browser Support

This library relies on [Fetch API](https://fetch.spec.whatwg.org/), which is supported in the following browsers:

![Chrome](https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_48x48.png) | ![Firefox](https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_48x48.png) | ![Opera](https://github.com/alrra/browser-logos/raw/master/src/opera/opera_48x48.png) | ![Safari](https://github.com/alrra/browser-logos/raw/master/src/safari/safari_48x48.png) | ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Edge](https://github.com/alrra/browser-logos/raw/master/src/edge/edge_48x48.png) | ![iOSSafari](https://github.com/alrra/browser-logos/raw/master/src/safari-ios/safari-ios_48x48.png) |
--- | --- | --- | --- | --- | --- | --- |
42+ ✔ | 40+ ✔ | 29+ ✔ | 10.1+ ✔ | Nope ✘ | 14+ ✔ | 10.3+ ✔ |

For more detailed information, [see caniuse.com](https://caniuse.com/#feat=fetch).

## Installation and Usage
This library depends on [fetch](https://fetch.spec.whatwg.org/) to make requests. For environments that don't support fetch, like NodeJS or older browser, you'll need to provide a polyfill.

### NodeJS

Install both [node-fetch polyfill](https://github.com/bitinn/node-fetch) and [easy-spotify](https://www.npmjs.com/package/easy-spotify): 

`terminal`
```sh
$ npm install node-fetch easy-spotify --save
```
`app.js`
```js
// set node-fetch as global.fetch before anything
global.fetch = require('node-fetch');
// now you can use the library
const EasySpotify = require('easy-spotify');
const spotify = new EasySpotify({token: 'your-token-here'});
```
### Browser

Install [easy-spotify](https://www.npmjs.com/package/easy-spotify) from npm and require it from /dist folder.

`index.html`
```html
<!-- import default version -->
<script src="node_modules/easy-spotify/dist/easy-spotify.umd.js"></script>
<!-- or import minified version -->
<!-- <script src="node_modules/easy-spotify/dist/easy-spotify.umd.min.js"></script> -->
<!-- import your js file -->
<script src="js/app.js"></script>
```

`app.js`
```js
const spotify = new EasySpotify({token: 'your-token-here'})
```

### Examples
To see examples, refer to the [examples folder](https://github.com/bruno-lombardi/easy-spotify/tree/master/examples).

## Documentation

> This library is still in development (so as the documentation). All methods returns a Promise that when fullfilled returns the data from the response body.

### getAlbum(id)

| | |
| ---| --- |
| **Description** | Get an album with provided id |
| **Endpoint** | https://api.spotify.com/v1/albums/{id} |

**Arguments**

| Argument | Type | Example |
| --- | --- | --- |
| `id` | *string* | `'4aawyAB9vmqN3uQ7FjRGTy'` |

**Code Example**
```js
spotify.getAlbum('4aawyAB9vmqN3uQ7FjRGTy').then(data => {
  // do something
})
```

### getAlbums(ids)

| | |
| --- | --- |
| **Description** | Get albums with provided ids |
| **Endpoint** | https://api.spotify.com/v1/albums?ids={ids} |

**Arguments**

| Argument | Type | Example |
| --- | --- | --- |
| `ids` | *Array(string)* | `['382ObEPsp2rxGrnsizN5TX','1A2GTWGtFfWp7KSQTwWOyo']` |

**Code Example**
```js
spotify.getAlbums(['382ObEPsp2rxGrnsizN5TX','1A2GTWGtFfWp7KSQTwWOyo']).then(data => {
  // do something
})
```

### getAlbumTracks(id)

| | |
| --- | --- |
| **Description** | Get album tracks with provided id |
| **Endpoint** | https://api.spotify.com/v1/albums/{id}/tracks |

**Arguments**

| Argument | Type | Example |
| --- | --- | --- |
| `id` | *string* | `'382ObEPsp2rxGrnsizN5TX'` |

**Code Example**
```js
spotify.getAlbumTracks('382ObEPsp2rxGrnsizN5TX').then(data => {
  // do something
})
```

### search(query, type)

| | |
| --- | --- |
| **Description** | Generic search information with provided query and type |
| **Endpoint** | https://api.spotify.com/v1/search?q={query}&type={type} |

**Arguments**

| Argument | Type | Example |
| --- | --- | --- |
| `query` | *string* | `'Bruno Mars'` |
| `type` | *string* | `'album'`, `'artist'`, `'playlist'`, `'track'` |

**Code Example**
```js
spotify.search('Bruno Mars', 'artist').then(data => {
  // do something
})

spotify.search('Never Let Me Go', 'track').then(data => {
  // do something
})
```



## Features to implement
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
