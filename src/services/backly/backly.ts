import { app } from '../feathers/feathers'
import feathers from '@feathersjs/feathers'

export interface BacklyAuth {
  ready: boolean
  state: boolean
  register: (
    data: { login: string; password: string; name: string; role: string },
    res?: CallableFunction,
    rej?: CallableFunction
  ) => Promise<boolean>
  login: (
    data: { login: string; password: string },
    res?: CallableFunction,
    rej?: CallableFunction
  ) => Promise<void>
  reAuth: (res?: CallableFunction, rej?: CallableFunction) => Promise<void>
  logout: () => Promise<boolean>
}

class Backly {
  auth: BacklyAuth = {
    ready: false,
    state: false,
    register: async (data, res, rej) => {
      app
        .service('users')
        .create({
          ...data,
        })
        .then((r: any) => {
          res && res(r)
        })
        .catch((e: any) => {
          rej && rej(e)
          this.auth.state = false
        })
      return true
    },
    login: async (data, res, rej) => {
      app
        .authenticate({
          strategy: 'local',
          login: data.login,
          password: data.password,
        })
        .then((r) => {
          res && res(r)
          this.auth.state = true
          //this.app.authentication.storage.setItem('user', r.user)
          localStorage.setItem('user', JSON.stringify(r.user))
        })
        .catch((e) => {
          rej && rej(e)
          this.auth.state = false
          // Show login page (potentially with `e.message`)
          console.error('Authentication error', e)
        })
    },
    reAuth: async (res, rej) => {
      app
        .reAuthenticate()
        .then((r) => {
          res && res(r)
          this.auth.state = true
          localStorage.setItem('user', JSON.stringify(r.user))
        })
        .catch((e) => {
          rej && rej(e)
          localStorage.removeItem('user')
          this.auth.state = false
        })
    },
    logout: async () => {
      this.auth.state = false
      await app.logout()
      localStorage.removeItem('user')
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
