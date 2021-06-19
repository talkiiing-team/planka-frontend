import feathers from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'

const app = feathers()
const restClient = rest('http://feathers-api.com')
app.configure(restClient.axios(axios))

export {app}
