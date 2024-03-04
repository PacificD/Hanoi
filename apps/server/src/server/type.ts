export type { Context } from './context'
export type { AppRouter } from './router'

export interface ServerOptions {
  dev?: boolean
  port?: number
  prefix?: string
  environment: 'development' | 'production' | 'test' | 'local'
}
