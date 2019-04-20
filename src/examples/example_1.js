import {createLatch} from '../lib'

async function main() {
  const latch = await createLatch()

  setTimeout(async () => {
    for await (const item of latch.items())
      console.log(item)
  }, 10)

  await latch.push(1)
  await latch.push(2)
  await latch.push(3)
  await latch.return()
}

main()
