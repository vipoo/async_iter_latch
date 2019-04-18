import {createLatch} from '../lib'

async function main() {
  const {push, items} = await createLatch()

  setTimeout(async () => {
    for await (const item of items()) {
      console.log(item)
      break
    }
    console.log('Only consumed one item, rest where thrown away')
  }, 10)

  await push('a')
  await push('b')
  await push('c')
}

main()
