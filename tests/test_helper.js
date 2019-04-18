import chaiAsPromised from 'chai-as-promised'
export {default as sinon} from 'sinon'
import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'

chai.use(chaiAsPromised)
chai.use(sinonChai)

export const expect = chai.expect
export const subjectEach = beforeEach

afterEach(() => sinon.restore())

chai.Assertion.addMethod('iterateTo', async function(expectedValues) {
  const result = []
  for await (const x of this._obj)
    result.push(x)

  return new chai.Assertion(result).to.deep.eq(expectedValues)
})

const unique = Symbol('unique')
async function getPromiseState(p) {
  return Promise.race([p, Promise.resolve(unique)])
    .then(y => y === unique ? 'pending' : 'resolved', () => 'rejected')
}

chai.Assertion.addProperty('pending', async function() {
  const state = await getPromiseState(this._obj)

  if (this.__flags.negate)
    return new chai.Assertion(state).to.not.eq('pending')
  else
    return new chai.Assertion(state).to.eq('pending')
})
