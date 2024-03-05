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
  appID: string
  appSecret: string
  host: string
  client: UserClient
}

export interface IHanoi {
  _config: IConfig
  send: () => void
}
