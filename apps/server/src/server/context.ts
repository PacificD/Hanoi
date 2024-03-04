import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'
import { TRPCError } from '@trpc/server'
import { authConfig } from '../config/auth.config'

async function decodeAndVerifyJwtToken(token: string): Promise<string> {
  const decoded = jwt.verify(token, authConfig.secretKey) as string
  return decoded
}

export const prisma = new PrismaClient()

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  if (req.headers.authorization) {
    try {
      const app = await decodeAndVerifyJwtToken(
        req.headers.authorization.split(' ')[1]
      )
      return { req, res, prisma, app }
    } catch (err) {
      throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
    }
  }

  return { req, res, prisma }
}

export type Context = Awaited<ReturnType<typeof createContext>>
