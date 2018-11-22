'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchTracks = exports.searchPlaylists = exports.searchArtists = exports.searchAlbums = exports.search = undefined;

var _config = require('./config');

var _utils = require('./utils');

var search = exports.search = function search(query, type) {
  return fetch(_config.API_URL + '/search?q=' + query + '&type=' + type).then(_utils.toJSON);
};
var searchAlbums = exports.searchAlbums = function searchAlbums(query) {
  return search(query, 'album');
};
var searchArtists = exports.searchArtists = function searchArtists(query) {
  return search(query, 'artist');
};
var searchPlaylists = exports.searchPlaylists = function searchPlaylists(query) {
  return search(query, 'playlist');
};
var searchTracks = exports.searchTracks = function searchTracks(query) {
  return search(query, 'track');
};