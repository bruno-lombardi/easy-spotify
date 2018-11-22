import chai, { expect } from 'chai'
import {
  search,
  searchAlbums,
  searchArtists,
  searchPlaylists,
  searchTracks
} from '../src/search'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

global.fetch = require('node-fetch')

describe('Search', () => {
  let fetchedStub
  let promise

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.resolves({ json: () => ({ album: 'name' }) })
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist
    })
    it('should exist the searchAlbumns method', () => {
      expect(searchAlbums).to.exist
    })
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist
    })
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist
    })
    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist
    })
  })

  describe('search', () => {
    it('should call fetch()', () => {
      search()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should receive correct url to fetch', () => {
      context('passing one type', () => {
        search('Incubus', 'artist')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        )

        search('Incubus', 'album')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album'
        )
      })

      context('passing more than one type', () => {
        search('Incubus', ['artist', 'album'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist,album'
        )
      })
    })

    it('should return JSON data from Promise', () => {
      const artists = search('Incubus', 'artist')

      artists.then(data => {
        expect(data).to.be.eql({ album: 'name' })
      })
    })
  })

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one artist', () => {
        searchArtists('Incubus')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        )
      })

      context('passing multiple artists', () => {
        searchArtists(['Incubus', 'Muse', 'Rage'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus,Muse,Rage&type=artist'
        )
      })
    })
  })

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      searchAlbums('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one album', () => {
        searchAlbums('Incubus')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album'
        )
      })
      context('passing multiple albums', () => {
        searchAlbums(['Incubus', 'Muse'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus,Muse&type=album'
        )
      })
    })
  })

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      searchPlaylists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one album', () => {
        searchPlaylists('Incubus')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=playlist'
        )
      })
      context('passing multiple albums', () => {
        searchPlaylists(['Incubus', 'Muse'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus,Muse&type=playlist'
        )
      })
    })
  })

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      searchTracks('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one album', () => {
        searchTracks('Incubus')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=track'
        )
      })
      context('passing multiple albums', () => {
        searchTracks(['Incubus', 'Muse'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus,Muse&type=track'
        )
      })
    })
  })
})
