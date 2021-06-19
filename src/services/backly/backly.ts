class Backly {
  // Auth
  auth: {
    state: false
  } | undefined

  constructor() {
    // @ts-ignore
    this.auth.state = false
  }
}

const classicBacklyInstance = new Backly()


export default classicBacklyInstance

