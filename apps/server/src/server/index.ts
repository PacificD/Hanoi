import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions
} from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import pretty from 'pino-pretty'
import pino from 'pino'
import { createContext } from './context'
import { appRouter } from './router'
import { ServerOptions, AppRouter } from './type'

const createServer = (opts: ServerOptions) => {
  const port = opts.port ?? 5000
  const prefix = opts.prefix ?? '/trpc'

  const stream = pretty({
    colorize: true,
    translateTime: 'HH:MM:ss Z',
    ignore: 'pid,hostname'
  })
  const prettyLogger = pino({ level: 'debug' }, stream)

  const server = fastify({
    maxParamLength: 5000,
    logger:
      opts.environment === 'local' || opts.environment === 'test'
        ? prettyLogger
        : true
  })

  server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error)
      }
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions']
  })

  const stop = () => server.close()
  const start = async () => {
    try {
      await server.listen({ port })
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }

  return { server, start, stop }
}

export default createServer
