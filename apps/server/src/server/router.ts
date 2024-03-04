import hanoiAppRouter from '@/modules/hanoi-app/router'
import { router } from './trpc'

export const appRouter = router({
  app: hanoiAppRouter
})

export type AppRouter = typeof appRouter
