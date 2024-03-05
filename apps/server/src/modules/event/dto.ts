import { z } from 'zod'

export const createCustomEventSchema = z.object({
  action: z
    .string({
      required_error: 'Event action is required!'
    })
    .min(1),
  label: z.coerce.string()
})

export type CreateCustomEventDto = z.TypeOf<typeof createCustomEventSchema>
