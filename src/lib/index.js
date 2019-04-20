import {deferredPromise} from './promise_helpers'

export async function createLatch() {
  let values = undefined
  let keepAlive
  let latch = deferredPromise()
  const unlatch = []
  let hasStopped = false
  const keepAliveTimer = () => keepAlive = setTimeout(keepAliveTimer, 250)

  async function push(item, options = {}) {
    options = {done: false, ...options}
    const p = unlatch.length === 0 ? {marker: 'none'} : unlatch[unlatch.length - 1]
    const newP = deferredPromise()
    unlatch.push(newP)
    await p.promise

    values = {...options, item}
    latch.res()

    return unlatch.length
  }

  async function stop() {
    push(undefined, {done: true})
  }

  async function abort(error) {
    push(undefined, {error})
  }

  async function untilNextValueAvailable() {
    await latch.promise
    latch = deferredPromise({})
  }

  function unLatchNextValue() {
    const p = unlatch.shift()
    p.res()
  }

  function unlatchAll() {
    latch.res()
    for (const p of unlatch)
      p.res()
    unlatch.length = 0
  }

  function extractNextValue() {
    const v = values
    values = undefined
    return v
  }

  async function* items() {
    keepAliveTimer()

    try {
      while (true) {
        await untilNextValueAvailable()

        const {item, done, error} = extractNextValue()
        if (error)
          throw error
        if (done)
          break
        yield item

        unLatchNextValue()
      }
    } finally {
      hasStopped = true
      unlatchAll()
      clearTimeout(keepAlive)
    }
  }

  function hasStoppedConsuming() {
    return hasStopped
  }

  return {push, abort, stop, completed: stop, return: stop, error: abort, items, hasStoppedConsuming}
}
