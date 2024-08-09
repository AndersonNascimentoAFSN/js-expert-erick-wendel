import {
  expect,
  describe,
  it,
  jest,
  beforeEach,
  beforeAll,
  afterAll
} from '@jest/globals'

import { tmpdir } from 'node:os'
import fsPromises from 'fs/promises'
import { join } from 'node:path'

import { createLayersIfNotExists } from './../../src/createLayers.js'

async function getFolders(config) {
  return fsPromises.readdir(join(config.mainPath, config.defaultMainFolder))
}

describe('#Integration - Layers - Folders Structure', () => {
  let tmpDirectory = ''
  const config = {
    defaultMainFolder: 'src',
    mainPath: '',
    layers: ['service', 'factory', 'repository'].sort()
  }

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), 'skeleton-'))
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true })
  })

  it('should not create folders if it exists', async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath)
    await createLayersIfNotExists(config)
    const afterRun = await getFolders(config)

    expect(beforeRun).not.toStrictEqual(afterRun)
    expect(afterRun).toEqual(config.layers)
  })
  it('should create folders if it doesn`t exists', async () => {
    const beforeRun = await getFolders(config) // pega as pastas do teste anterior
    await createLayersIfNotExists(config)
    const afterRun = await getFolders(config)

    expect(afterRun).toEqual(beforeRun)
  })
})
