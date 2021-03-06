'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {Object} EasySpotifyConfig
 * @property {string} api - Api url, by default is https://api.spotify.com/v1
 * @property {string} token - OAuth token, required
 */

var EasySpotify = function () {
  /**
   * Constructor takes a config object, which receives api and token.
   * @param {EasySpotifyConfig} config
   * @returns {EasySpotify} object
   */
  function EasySpotify(config) {
    _classCallCheck(this, EasySpotify);

    if (!config.api) {
      config.api = _config.API_URL;
    }
    this.config = config;
  }

  /**
   * Set your own spotify token, or you can't authorize spotify requests
   * @param {string} token spotify OAuth token to make the requests with
   */


  _createClass(EasySpotify, [{
    key: 'setToken',
    value: function setToken(token) {
      this.config.token = token;
    }

    /**
     * Request maker method, makes the request with the OAuth token passed in config and transforms the response to JSON
     * You should not use this method unless you want a specific spotify route
     * @method request
     * @param {string} url Full url to the api, including the endpoint and params to make full request
     */

  }, {
    key: 'request',
    value: function request(url) {
      var headers = {
        headers: {
          Authorization: 'Bearer ' + this.config.token
        }
      };
      return fetch(url, headers).then(_utils.toJSON);
    }

    /**
     * Get some album from spotify
     * @example
     * // Get TRON: Legacy Reconfigured album
     * easySpotifyInstance.getAlbum('382ObEPsp2rxGrnsizN5TX').then(data => console.log(data))
     * @param {string} id The id of the album to get data from, ex: 382ObEPsp2rxGrnsizN5TX
     */

  }, {
    key: 'getAlbum',
    value: function getAlbum(id) {
      return this.request(this.config.api + '/albums/' + id);
    }

    /**
     * Get multiple albums from spotify
     * You can pass in an array or only one string to this method
     * @example
     * // Get multiple albums
     * easySpotifyInstance.getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo', '2noRn2Aes5aoNVsU6iWThc']).then(data => console.log(data))
     * // Get only one album
     * easySpotifyInstance.getAlbums('2noRn2Aes5aoNVsU6iWThc').then(data => console.log(data))
     * @param {(string|string[])} ids A list of ids or only one id of albums to get data from, ex: 
     */

  }, {
    key: 'getAlbums',
    value: function getAlbums(ids) {
      return this.request(this.config.api + '/albums?ids=' + ids);
    }

    /**
     * Get the tracks of an album
     * @example
     * // Get the tracks of TRON: Legacy Reconfigured album
     * easySpotifyInstance.getAlbumTracks('382ObEPsp2rxGrnsizN5TX').then(data => console.log(data))
     * @param {string} id The id of the album to get tracks of
     */

  }, {
    key: 'getAlbumTracks',
    value: function getAlbumTracks(id) {
      return this.request(this.config.api + '/albums/' + id + '/tracks');
    }

    /**
     * A generic search on spotify.
     * @example
     * // Search for artist Bruno Mars
     * easySpotifyInstance.search('Bruno Mars', 'artist').then(data => console.log(data))
     * @param {string} query Your query, could be an album name, a track, an artist...
     * @param {string} type The item type you want to search, this can't be empty and should be either album, artist, playlist, or track
     */

  }, {
    key: 'search',
    value: function search(query, type) {
      return this.request(_config.API_URL + '/search?q=' + query + '&type=' + type);
    }

    /**
     * Search for albums on spotify
     * @example
     * // Search for album Global Warming
     * easySpotifyInstance.searchAlbums('Global Warming')
     * @param {string} query Can be an album name, an artist name, whatever you want
     */

  }, {
    key: 'searchAlbums',
    value: function searchAlbums(query) {
      return this.search(query, 'album');
    }

    /**
     * Search for artists on spotify
     * @example
     * // Search for an artist but using it's track name
     * easySpotifyInstance.searchArtists('Talking to The Moon').then(data => console.log(data))
     * @param {string} query Can be a track name, or anything you can use to find an artist
     */

  }, {
    key: 'searchArtists',
    value: function searchArtists(query) {
      return this.search(query, 'artist');
    }

    /**
     * Search for playlists on spotify
     * @example
     * // Search for a NCS Playlist
     * easySpotifyInstance.searchPlaylists('NCS').then(data => console.log(data))
     * @param {string} query Can be a playlist name, a track name or anything you want
     */

  }, {
    key: 'searchPlaylists',
    value: function searchPlaylists(query) {
      return this.search(query, 'playlist');
    }

    /**
     * Search for tracks on spotify
     * @example
     * // Search for track Never Let Me Go
     * easySpotify.searchTracks('Never Let Me Go').then(data => console.log(data))
     * @param {string} query Can be a track name, an artist name, or anything you want
     */

  }, {
    key: 'searchTracks',
    value: function searchTracks(query) {
      return this.search(query, 'track');
    }
  }]);

  return EasySpotify;
}();

exports.default = EasySpotify;
module.exports = exports.default;