import { pipeline } from 'stream/promises'
import { setTimeout } from 'timers/promises'

async function* myCustomReadableStream() {
  yield Buffer.from('This is my')
  await setTimeout(100)
  yield Buffer.from('custom readable')
}

async function* myCustomTransformStream(stream) {
  for await (const chunk of stream) {
    yield chunk.toString().replace(/\s/g, '_')
  }
}

async function* myCustomDuplexStream(stream) {
  let bytesRead = 0
  const wholeString = []
  for await (const chunk of stream) {
    console.log('[Duplex writable]', chunk)
    bytesRead += chunk.length
    wholeString.push(chunk)
  }

  yield `wholeString ${wholeString.join('')}`
  yield `bytesRead ${bytesRead}`
}

async function* myCustomWritableStream(stream) {
  for await (const chunk of stream) {
    console.log(['writable'], chunk.toString())
  }
}


try {
  const controller = new AbortController()

  // caso precise abortar
  // setImmediate(() => controller.abort())

  await pipeline(
    myCustomReadableStream,
    myCustomTransformStream,
    myCustomDuplexStream,
    myCustomWritableStream,
    {
      signal: controller.signal
    }
  )
} catch (error) {
  console.error('\nabort', error.message)
}
