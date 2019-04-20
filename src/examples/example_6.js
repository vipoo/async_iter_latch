import {createLatch} from '../lib'

async function main() {
  const latch1 = await createLatch()
  const latch2 = await createLatch()

  setTimeout(async () => {
    for await (const item of latch1.items())
      await latch2.push(item)

    await latch2.stop()
  }, 0)

  setTimeout(async () => {
    for await (const item of latch2.items()) {
      console.log('item', item)
      break
    }
    console.log('Only consumed one item, rest where thrown away')
  }, 10)

  await latch1.push('a')
  await latch1.push('b')
  await latch1.push('c')
  await latch1.stop()
}

main()
