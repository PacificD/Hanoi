import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { Context } from './type'

export const trpc = initTRPC.context<Context>().create({
  // transformer: superjson,
  errorFormatter({ shape, error, ctx }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      ctx?.req.log.error(error)
      return { ...shape, message: 'Internal server error' }
    }
    return shape
  }
})

const isAuthenticatedMiddleware = trpc.middleware(({ next, ctx }) => {
  if (!ctx.appID || ctx.appID === -1) {
    throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      appID: ctx.appID
    }
  })
})

export const router = trpc.router
export const procedure = trpc.procedure.use(isAuthenticatedMiddleware)
export const noAuthProcedure = trpc.procedure
