import { API_URL } from './config'
import { toJSON } from './utils'

/**
 * @typedef {Object} EasySpotifyConfig
 * @property {string} api - Api url, by default is https://api.spotify.com/v1
 * @property {string} token - OAuth token, required
 */

export default class EasySpotify {
  /**
   * Constructor takes a config object, which receives api and token.
   * @param {EasySpotifyConfig} config
   * @returns {EasySpotify} object
   */
  constructor(config) {
    if(!config.api) {
      config.api = API_URL
    }
    this.config = config
  }

  /**
   * Set your own spotify token, or you can't authorize spotify requests
   * @param {string} token spotify OAuth token to make the requests with
   */
  setToken(token) {
    this.config.token = token
  }

  /**
   * Request maker method, makes the request with the OAuth token passed in config and transforms the response to JSON
   * You should not use this method unless you want a specific spotify route
   * @method request
   * @param {string} url Full url to the api, including the endpoint and params to make full request
   */
  request(url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.config.token}`
      }
    }
    return fetch(url, headers).then(toJSON)
  }

  /**
   * Get some album from spotify
   * @example
   * // Get TRON: Legacy Reconfigured album
   * easySpotifyInstance.getAlbum('382ObEPsp2rxGrnsizN5TX').then(data => console.log(data))
   * @param {string} id The id of the album to get data from, ex: 382ObEPsp2rxGrnsizN5TX
   */
  getAlbum(id) {
    return this.request(`${this.config.api}/albums/${id}`)
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
  getAlbums(ids) {
    return this.request(`${this.config.api}/albums?ids=${ids}`)
  }

  /**
   * Get the tracks of an album
   * @example
   * // Get the tracks of TRON: Legacy Reconfigured album
   * easySpotifyInstance.getAlbumTracks('382ObEPsp2rxGrnsizN5TX').then(data => console.log(data))
   * @param {string} id The id of the album to get tracks of
   */
  getAlbumTracks(id) {
    return this.request(`${this.config.api}/albums/${id}/tracks`)
  }

  /**
   * A generic search on spotify.
   * @example
   * // Search for artist Bruno Mars
   * easySpotifyInstance.search('Bruno Mars', 'artist').then(data => console.log(data))
   * @param {string} query Your query, could be an album name, a track, an artist...
   * @param {string} type The item type you want to search, this can't be empty and should be either album, artist, playlist, or track
   */
  search(query, type) {
    return this.request(`${API_URL}/search?q=${query}&type=${type}`)
  }

  /**
   * Search for albums on spotify
   * @example
   * // Search for album Global Warming
   * easySpotifyInstance.searchAlbums('Global Warming')
   * @param {string} query Can be an album name, an artist name, whatever you want
   */
  searchAlbums(query) {
    return this.search(query, 'album')
  }

  /**
   * Search for artists on spotify
   * @example
   * // Search for an artist but using it's track name
   * easySpotifyInstance.searchArtists('Talking to The Moon').then(data => console.log(data))
   * @param {string} query Can be a track name, or anything you can use to find an artist
   */
  searchArtists(query) {
    return this.search(query, 'artist')
  }

  /**
   * Search for playlists on spotify
   * @example
   * // Search for a NCS Playlist
   * easySpotifyInstance.searchPlaylists('NCS').then(data => console.log(data))
   * @param {string} query Can be a playlist name, a track name or anything you want
   */
  searchPlaylists(query) {
    return this.search(query, 'playlist')
  }

  /**
   * Search for tracks on spotify
   * @example
   * // Search for track Never Let Me Go
   * easySpotify.searchTracks('Never Let Me Go').then(data => console.log(data))
   * @param {string} query Can be a track name, an artist name, or anything you want
   */
  searchTracks(query) {
    return this.search(query, 'track')
  }
}
