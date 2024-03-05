import { CustomEventData } from './event'

declare global {
  interface Window {
    hanoi: IHanoi
  }
}

export enum UserClient {
  browser = 'browser',
  native = 'native',
  node = 'node'
}

export interface IConfig {
  appSecret: string
  host: string
  client: UserClient
}

export interface IHanoi {
  _config: IConfig
  send: (data: CustomEventData) => void
}
