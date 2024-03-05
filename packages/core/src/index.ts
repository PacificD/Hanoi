import { IHanoi, IConfig, UserClient, CustomEventData } from '@hanoi/types'

const userClientList = [UserClient.node, UserClient.native, UserClient.browser]
const SERVER_PREFIX = '/trpc'

// proxy
const hanoiEndpoint = {
  customEvent: '/event.create'
}

class Hanoi implements IHanoi {
  _config: IConfig
  private _needConfiguration = true

  constructor(config: IConfig) {
    this.checkConfiguration(config)
    if (this._needConfiguration) {
      throw new Error('Missing configuration!')
    }
    const host = config.host
    this._config = {
      ...config,
      host:
        host[host.length - 1] === '/'
          ? host + SERVER_PREFIX.slice(1)
          : host + SERVER_PREFIX
    }
  }

  private checkConfiguration(config: IConfig) {
    const { appSecret, host, client } = config
    this._needConfiguration =
      !appSecret || !host || !userClientList.includes(client)
  }

  public send(data: CustomEventData) {
    if (this._needConfiguration) {
      throw new Error('Missing configuration!')
    }
    if (this._config.client === UserClient.browser && navigator) {
      const headers = {
        'Content-Type': 'application/json',
        authorization: this._config.appSecret
      }
      const blob = new Blob([JSON.stringify(data)], headers)
      navigator.sendBeacon(this._config.host + hanoiEndpoint.customEvent, blob)
    }
  }
}

export const tracking = (config: IConfig) => {
  if (window.hanoi) return
  window.hanoi = new Hanoi(config)
}
