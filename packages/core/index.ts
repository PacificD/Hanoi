import { IHanoi, IConfig } from '@hanoi/types'

class Hanoi implements IHanoi {
  _config: IConfig

  constructor(config: IConfig) {
    this._config = config
  }

  send() {}
}

export const tracking = (config: IConfig) => {
  if (window.hanoi) return
  window.hanoi = new Hanoi(config)
}
