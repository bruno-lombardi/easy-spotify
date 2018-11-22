import chai, { expect } from 'chai'
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('Albums', () => {
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
    it('should exist getAlbum', () => {
      expect(getAlbum).to.exist
    })

    it('should exist getAlbums', () => {
      expect(getAlbums).to.exist
    })
  })

  describe('getAlbum', () => {
    it('should call fetch function', () => {
      getAlbum('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'
      )
    })

    it('should return correct data from Promise', () => {
      promise = fetchedStub.resolves({
        json: () => ({ id: '4aawyAB9vmqN3uQ7FjRGTy', name: 'Global Warming' })
      })
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
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
      getAlbums('Incubus')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      context('passing one album', () => {
        getAlbums('382ObEPsp2rxGrnsizN5TX')
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX'
        )
      })

      context('passing multiple albums', () => {
        getAlbums(['382ObEPsp2rxGrnsizN5TX', '1A2GTWGtFfWp7KSQTwWOyo'])
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
        const albums = getAlbums(['382ObEPsp2rxGrnsizN5TX'])
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
        const albums = getAlbums([
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
      getAlbumTracks('382ObEPsp2rxGrnsizN5TX')
      expect(fetchedStub).to.have.been.calledOnce
    })

    it('should call fetch with correct URL', () => {
      getAlbumTracks('382ObEPsp2rxGrnsizN5TX')
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
      const tracks = getAlbumTracks('382ObEPsp2rxGrnsizN5TX')
      tracks.then(data => {
        expect(data).to.be.eql([
          { id: '382ObEPsp2rxGrnsizN5TX', name: 'Global Warming' }
        ])
      })
    })

  })
})
