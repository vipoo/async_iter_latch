# async_iter_latch
-----------------

async_iter_latch allows for the async 'pushing' of values to a async iteration

The 'push' operation return a promise, that resolves when the iteration has consumed the item

## Overview

This iterator is similiar to Observable (rxjs), in that it supports a kind
of push value to consumer, as events happen in your application.

But it only supports one consumer per one producer
And the 'pushing' of values can be blocked, until the consumer has consumed the value

If the code pushing values, does not await the return promise, the values are then queued
for processing by the consumer.

See the example files for small code snippet examples

## Simple Example

```javascript

  // Create a push based iteration set
  const {push, abort, stop, items} = await createLatch()

  //Set up a background task to consume the items
  setTimeout(async () => {
    for await (const item of items())
      console.log(item)
  }, 0)

  //Values can be push to the iteration
  await push(1) // if you dont 'await' the values will be queued.
  await push(2)
  await push(3)
  await stop()

  // If you want to push an 'error' to the consumer
  await abort(new Error('My error'))

```

