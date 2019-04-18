
export function deferredPromise(marker) {
  let res
  let rej
  const promise = new Promise((_res, _rej) => { res = _res; rej = _rej })
  return {promise, rej, res, marker}
}
