import {
  expect,
  describe,
  it,
  jest,
  beforeEach,
} from '@jest/globals'

import fsPromises from 'fs/promises'

import templates from '../../src/templates/index.js'
import { createFiles } from '../../src/createFiles.js'
import { writeFile } from 'fs'

describe('#Layers - Files Structure', () => {
  const defaultLayers = ['repository', 'service', 'factory']
  const config = {
    mainPath: '.',
    defaultMainFolder: 'src',
    layers: defaultLayers,
    componentName: 'heroes',
    repositoryName: 'heroes',
    serviceName: 'heroes',
  }

  const repositoryLayer = `${config.componentName}`
  const serviceLayer = `${config.componentName}`

  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should not create file structure on inexistent templates', async () => {
    const myConfig = {
      ...config,
      layers: ['inexistent'],
    }

    const expected = { error: 'the chosen layer does not have a template' }
    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)
  })
  it('repository should not add any additional dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name)
      .mockResolvedValue()
    jest.spyOn(templates, 'repositoryTemplate')
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = {
      ...config,
      layers: ['repository'],
    }

    const expected = { success: true }

    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName)
    // expect(fsPromises.writeFile).toHaveBeenCalledWith(myConfig) 
    // expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    // expect(templates.repositoryTemplate).toHaveBeenCalledTimes(myConfig.layers.length)
  })
  it('service should have repository as dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name)
      .mockResolvedValue()
    jest.spyOn(templates, 'serviceTemplate')
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = {
      ...config,
      layers: ['repository', 'service'],
    }

    const expected = { success: true }

    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer)
  })
  it('factory should have repository and service as dependencies', async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name)
      .mockResolvedValue()
    jest.spyOn(templates, 'factoryTemplate')
      .mockReturnValue({ fileName: '', template: '' })

    const myConfig = {
      ...config,
      layers: ['repository', 'service', 'factory'],
    }

    const expected = { success: true }

    const result = await createFiles(myConfig)
    expect(result).toStrictEqual(expected)

    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length)
    expect(templates.factoryTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer, serviceLayer)
  })
})