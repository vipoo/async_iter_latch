import {createLatch} from '../lib'

async function main() {
  const {push, stop, items} = await createLatch()

  setTimeout(async () => {
    for await (const item of items())
      console.log(item)
  }, 10)

  setTimeout(async () => {
    for (let i = 1; i < 200; i++)
      await push({y: i})
  }, 100)

  setTimeout(async () => {
    for (let i = 1; i < 200; i++)
      await push({x: i})
  }, 100)

  setTimeout(async () => {
    for (let i = 1; i < 200; i++)
      await push({x: i})
  }, 100)

  setTimeout(async () => {
    for (let i = 1; i < 200; i++)
      await push({x: i})
  }, 100)

  setTimeout(stop, 2000)
}

main()
