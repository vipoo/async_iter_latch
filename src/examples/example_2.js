import {createLatch} from '../lib'

async function main() {
  const {push} = await createLatch()

  // if items are not consumed, nothing really happens
  await push(1)
  await push(2)
  await push(3)
}

main()
