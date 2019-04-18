import {expect, subjectEach} from './test_helper'
import {deferredPromise} from '../src/lib/promise_helpers'

describe('promise_helpers', () => {
  describe('#deferred_promise', () => {
    let deferredP

    subjectEach(() => deferredP = deferredPromise())

    it('promise is initially pending', () => {
      return expect(deferredP.promise).to.be.pending
    })

    it('is resolved', async () => {
      deferredP.res(1)
      return expect(deferredP.promise).to.eventually.eq(1)
    })

    it('is rejected', async () => {
      deferredP.rej(new Error('blah'))
      return expect(deferredP.promise).to.eventually.be.rejectedWith('blah')
    })
  })
})
