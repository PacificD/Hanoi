import { router } from './trpc'
import hanoiAppRouter from '@/modules/hanoi-app/router'
import eventRouter from '@/modules/event/router'

export const appRouter = router({
  app: hanoiAppRouter,
  event: eventRouter
})

export type AppRouter = typeof appRouter
