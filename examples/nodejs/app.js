global.fetch = require('node-fetch')
const EasySpotify = require('../../lib') // the lib folder contains the main code

const spotify = new EasySpotify({token: 'your-token-here'})
// or 
// const spotify = new EasySpotify({})
// spotify.setToken('your-token-here')
const albums = spotify.searchAlbums('Incubus')

albums.then(data => {
  console.log(data)
})