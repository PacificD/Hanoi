import { Event as CustomEvent } from '@prisma/client'
import { Context } from '@/server/type'
import { CreateCustomEventDto } from './dto'

export const createCustomEvent = async (
  input: CreateCustomEventDto,
  ctx: Context
): Promise<CustomEvent> => {
  const event = await ctx.prisma.event.create({
    data: {
      action: input.action,
      label: input.label,
      appId: ctx.appID
    }
  })

  return event
}

export const listEvents = async (ctx: Context): Promise<CustomEvent[]> => {
  const record = await ctx.prisma.event.findMany({
    where: {
      appId: ctx.appID
    }
  })
  return record
}
