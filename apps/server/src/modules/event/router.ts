import { procedure, router } from '@/server/trpc'
import { createCustomEvent, listEvents } from './server'
import { createCustomEventSchema } from './dto'

const eventRouter = router({
  list: procedure.query(async ({ ctx }) => listEvents(ctx)),
  create: procedure
    .input(createCustomEventSchema)
    .mutation(async ({ input, ctx }) => createCustomEvent(input, ctx))
})

export default eventRouter
