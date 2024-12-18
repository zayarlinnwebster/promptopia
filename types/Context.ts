import type Params from './Params'

// Define the type for the handler context with params as a Promise
interface Context {
  params: Promise<Params>
}

export default Context
