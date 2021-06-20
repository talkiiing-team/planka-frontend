const routes = {
  auth: {
    in: 'in',
    up: 'up',
    default: 'auth',
  },
  barcode: {
    default: 'barcode',
  },
  qrcode: {
    default: 'qrcode',
  },
  leaderboard: {
    default: 'leaderboard',
  },
  stats: {
    default: 'stats',
  },
  settings: {
    default: 'settings',
  },

  default: '',
}

/*

          // @ts-ignore
          branch = branch[v]
 */

const buildRoute = (routeNodes: string[]) => {
  let branch = Object.assign({}, routes)
  const url =
    '/' +
    routeNodes
      .map((v) => {
        if (branch.hasOwnProperty(v)) {
          // @ts-ignore
          branch = branch[v]
        } else {
          throw new Error('Cannot build route')
        }
        let val
        if (branch.hasOwnProperty('default')) {
          val = branch.default
        } else {
          val = branch.toString()
        }
        return val
      })
      .join('/')
  return url
}

export default routes
export { buildRoute }
