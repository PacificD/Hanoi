import { z } from 'zod'
import { UserClient } from '@hanoi/types'

export const createHanoiAppSchema = z.object({
  name: z
    .string({
      required_error: 'App name is required!'
    })
    .min(1),
  client: z.nativeEnum(UserClient, {
    required_error: 'App client is required!'
  })
})

export type CreateHanoiAppDto = z.TypeOf<typeof createHanoiAppSchema>
