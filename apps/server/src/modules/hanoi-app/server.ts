import { App } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import jwt from 'jsonwebtoken'
import { Context } from '@/server/type'
import { authConfig } from '@/config/auth.config'
import { CreateHanoiAppDto } from './dto'

type CreateHanoiAppResponse = App & {
  token: string
}

export const createHanoiApp = async (
  input: CreateHanoiAppDto,
  ctx: Context
): Promise<CreateHanoiAppResponse> => {
  const appRecord = await ctx.prisma.app.findFirst({
    where: {
      name: input.name
    }
  })

  if (appRecord) {
    throw new TRPCError({
      message: 'App already exists!',
      code: 'BAD_REQUEST'
    })
  }

  const token = jwt.sign(
    {
      name: input.name,
      client: input.client,
      time: new Date().getTime()
    },
    authConfig.secretKey
    // { expiresIn: authConfig.jwtExpiresIn }
  )

  const user = await ctx.prisma.app.create({
    data: {
      name: input.name,
      client: input.client
    }
  })

  return {
    ...user,
    token
  }
}
