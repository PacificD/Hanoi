import { noAuthProcedure, router } from '@/server/trpc'
import { createHanoiAppSchema } from './dto'
import { createHanoiApp } from './server'

const hanoiAppRouter = router({
  create: noAuthProcedure
    .input(createHanoiAppSchema)
    .mutation(async ({ input, ctx }) => createHanoiApp(input, ctx))
})

export default hanoiAppRouter
