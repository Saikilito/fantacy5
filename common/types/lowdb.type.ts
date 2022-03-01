import { Low } from 'lowdb'

export interface LowWithChain<T = unknown> extends Low<T> {
  // powered by lodash
  chain?: any
}
