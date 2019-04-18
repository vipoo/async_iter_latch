import {createLatch} from '../lib'

async function main() {
  const {push, abort, items} = await createLatch()

  setTimeout(async () => {
    try {
      for await (const item of items())
        console.log(item)
    } catch (e) {
      console.log(e.stack)
    }
  }, 10)

  await push(1)
  await push(2)
  await abort(new Error('This is an error'))
}

main()
