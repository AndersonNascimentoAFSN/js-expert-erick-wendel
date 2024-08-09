import {
  expect,
  describe,
  it,
  jest,
  beforeEach,
} from '@jest/globals'

import fsPromises from 'fs/promises'
import fs from 'fs'

import { createLayersIfNotExists } from '../../src/createLayers.js'

describe('#Layers - Folder Structure', () => {
  const defaultLayers = ['repository', 'service', 'factory']

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  it('should create folders if it doesn`t  exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false)

    await createLayersIfNotExists({
      mainPath: '',
      defaultMainFolder: '',
      layers: defaultLayers
    })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length)

  })
  it('should not create folders if it exists', async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue()
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true)

    await createLayersIfNotExists({
      mainPath: '',
      defaultMainFolder: '',
      layers: defaultLayers
    })

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length)
    expect(fsPromises.mkdir).not.toHaveBeenCalledTimes(defaultLayers.length)
  })
})