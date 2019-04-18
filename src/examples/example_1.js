import {createLatch} from '../lib'

async function main() {
  const {push, stop, items} = await createLatch()

  setTimeout(async () => {
    for await (const item of items())
      console.log(item)
  }, 10)

  await push(1)
  await push(2)
  await push(3)
  await stop()
}

main()
