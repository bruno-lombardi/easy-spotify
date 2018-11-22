import { API_URL } from './config'
import { toJSON } from './utils'

export const search = (query, type) => {
  return fetch(`${API_URL}/search?q=${query}&type=${type}`).then(toJSON)
}
export const searchAlbums = query => {
  return search(query, 'album')
}
export const searchArtists = query => {
  return search(query, 'artist')
}
export const searchPlaylists = query => {
  return search(query, 'playlist')
}
export const searchTracks = query => {
  return search(query, 'track')
}
