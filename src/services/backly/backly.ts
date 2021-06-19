import { app } from '../feathers/feathers'
import feathersClient from '@feathersjs/client'
import feathers from '@feathersjs/feathers'

export interface BacklyAuth {
  ready: boolean
  state: boolean
  register: () => boolean
  login: () => boolean
}

class Backly {
  // Home
  auth: BacklyAuth = {
    ready: false,
    state: false,
    register: (): boolean => {
      app.configure(feathersClient.authentication())
      return true
    },
    login: (): boolean => {
      return true
    },
  }
  app: feathers.Application

  constructor() {
    this.auth.ready = true
    this.app = app
  }
}

const classicBacklyInstance = new Backly()


export default classicBacklyInstance

