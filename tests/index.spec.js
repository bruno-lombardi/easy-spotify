import chai, { expect } from 'chai'

import EasySpotify from '../src/index'
import { API_URL } from '../src/config'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
global.fetch = require('node-fetch')

describe('EasySpotify', () => {
  let fetchedStub
  let promise

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.resolves({ json: () => ({ album: 'name' }) })
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  it('should create an instance of EasySpotify', () => {
    let easySpotify = new EasySpotify({token: 'token'})
    expect(easySpotify).to.be.instanceOf(EasySpotify)
  })

  it('should correct use set config', () => {
    let easySpotify = new EasySpotify({token: 'token'})
    expect(easySpotify.config.token).to.equal('token')
    expect(easySpotify.config.api).to.equal(API_URL)
  })

  describe('request() method', () => {
    it('should have request method', () => {
      let easySpotify = new EasySpotify({token: 'token'})
      expect(easySpotify.request).to.exist
    })

    it('should call fetch', () => {
      let easySpotify = new EasySpotify({token: 'token'})
      easySpotify.request()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct url', () => {
      let easySpotify = new EasySpotify({token: 'token'})
      easySpotify.request('url')
      expect(fetchedStub).to.have.been.calledWith('url')
    })

    it('should call fetch with correct url and headers', () => {
      let easySpotify = new EasySpotify({token: 'token'})

      const headers = {
        headers: {
          Authorization: `Bearer token`
        }
      }
      easySpotify.request('url', headers)
      expect(fetchedStub).to.have.been.calledWith('url')
    })
  })
})

describe('Albums', () => {
  let fetchedStub
  let promise
  let easySpotify = new EasySpotify({token: 'token'})

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.resolves({ json: () => ({ album: 'name' }) })
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {
    it('should exist getAlbum', () => {
      expect(easySpotify.getAlbum).to.exist
    })

    it('should exist getAlbums', () => {
      expect(easySpotify.getAlbums).to.exist
    })
  })

  describe('getAlbum', () => {
    it('should call fetch function', () => {
      easySpotify.getAlbum('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      easySpotify.getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'
      )
    })

    it('should return correct data from Promise', () => {
      promise = fetchedStub.resolves({
        json: () => ({ id: '4aawyAB9vmqN3uQ7FjRGTy', name: 'Global Warming' })
      })
      const album = easySpotify.getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
      album.then(data => {
        expect(data).to.be.eql({
          id: '4aawyAB9vmqN3uQ7FjRGTy',
          name: 'Global Warming'
        })
      })
    })
  })

  describe('getAlbums', () => {
    it('should call fetch function', () => {
      easySpotify.getAlbums('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one album', () => {
        easySpotify.getAlbums('382ObEPsp2rxGrnsizN5TX')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX'
        )
      })

      context('passing multiple albums', () => {
        easySpotify.getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo'
        )
      })
    })

    it('should return correct data from Promise', () => {
      context('passing one album', () => {
        promise = fetchedStub.resolves({
          json: () => [
            { id: '4aawyAB9vmqN3uQ7FjRGTy', name: 'TRON: Legacy Reconfigured' }
          ]
        })
        const albums = easySpotify.getAlbums(['382ObEPsp2rxGrnsizN5TX'])
        albums.then(data => {
          expect(data).to.be.eql([
            { id: '4aawyAB9vmqN3uQ7FjRGTy', name: 'TRON: Legacy Reconfigured' }
          ])
        })
      })

      context('passing multiple albums', () => {
        promise = fetchedStub.resolves({
          json: () => [
            { id: '4aawyAB9vmqN3uQ7FjRGTy', name: 'TRON: Legacy Reconfigured' },
            { id: '1A2GTWGtFfWp7KSQTwWOyo', name: 'Human After All' }
          ]
        })
        const albums = easySpotify.getAlbums([
          '382ObEPsp2rxGrnsizN5TX',
          '1A2GTWGtFfWp7KSQTwWOyo'
        ])
        albums.then(data => {
          expect(data).to.be.eql([
            { id: '4aawyAB9vmqN3uQ7FjRGTy', name: 'TRON: Legacy Reconfigured' },
            { id: '1A2GTWGtFfWp7KSQTwWOyo', name: 'Human After All' }
          ])
        })
      })
    })
  })

  describe('getAlbumTracks', () => {
    it('should call fetch function', () => {
      easySpotify.getAlbumTracks('382ObEPsp2rxGrnsizN5TX')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      easySpotify.getAlbumTracks('382ObEPsp2rxGrnsizN5TX')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/382ObEPsp2rxGrnsizN5TX/tracks'
      )
    })

    it('should return correct data from Promise', () => {
      promise = fetchedStub.resolves({
        json: () => [
          { id: '382ObEPsp2rxGrnsizN5TX', name: 'Global Warming' }
        ]
      })
      const tracks = easySpotify.getAlbumTracks('382ObEPsp2rxGrnsizN5TX')
      tracks.then(data => {
        expect(data).to.be.eql([
          { id: '382ObEPsp2rxGrnsizN5TX', name: 'Global Warming' }
        ])
      })
    })

  })
})


describe('Search', () => {
  let fetchedStub
  let promise
  let easySpotify = new EasySpotify({token: 'token'})

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch')
    promise = fetchedStub.resolves({ json: () => ({ album: 'name' }) })
  })

  afterEach(() => {
    fetchedStub.restore()
  })

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(easySpotify.search).to.exist
    })
    it('should exist the searchAlbumns method', () => {
      expect(easySpotify.searchAlbums).to.exist
    })
    it('should exist the searchArtists method', () => {
      expect(easySpotify.searchArtists).to.exist
    })
    it('should exist the searchTracks method', () => {
      expect(easySpotify.searchTracks).to.exist
    })
    it('should exist the searchPlaylists method', () => {
      expect(easySpotify.searchPlaylists).to.exist
    })
  })

  describe('search', () => {
    it('should call fetch()', () => {
      easySpotify.search()
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should receive correct url to fetch', () => {
      context('passing one type', () => {
        easySpotify.search('Incubus', 'artist')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        )

        easySpotify.search('Incubus', 'album')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album'
        )
      })

      context('passing more than one type', () => {
        easySpotify.search('Incubus', ['artist', 'album'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist,album'
        )
      })
    })

    it('should return JSON data from Promise', () => {
      const artists = easySpotify.search('Incubus', 'artist')

      artists.then(data => {
        expect(data).to.be.eql({ album: 'name' })
      })
    })
  })

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      easySpotify.searchArtists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one artist', () => {
        easySpotify.searchArtists('Incubus')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        )
      })

      context('passing multiple artists', () => {
        easySpotify.searchArtists(['Incubus', 'Muse', 'Rage'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus,Muse,Rage&type=artist'
        )
      })
    })
  })

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      easySpotify.searchAlbums('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one album', () => {
        easySpotify.searchAlbums('Incubus')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album'
        )
      })
      context('passing multiple albums', () => {
        easySpotify.searchAlbums(['Incubus', 'Muse'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus,Muse&type=album'
        )
      })
    })
  })

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      easySpotify.searchPlaylists('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one album', () => {
        easySpotify.searchPlaylists('Incubus')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=playlist'
        )
      })
      context('passing multiple albums', () => {
        easySpotify.searchPlaylists(['Incubus', 'Muse'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus,Muse&type=playlist'
        )
      })
    })
  })

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      easySpotify.searchTracks('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one album', () => {
        easySpotify.searchTracks('Incubus')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=track'
        )
      })
      context('passing multiple albums', () => {
        easySpotify.searchTracks(['Incubus', 'Muse'])
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus,Muse&type=track'
        )
      })
    })
  })
})
