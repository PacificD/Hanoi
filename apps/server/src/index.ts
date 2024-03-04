import { serverConfig } from './config/server.config'
import createServer from './server'

const server = createServer(serverConfig)

server.start()
