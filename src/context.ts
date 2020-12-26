import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
    prisma: PrismaClient
} 

const context: Context = {
    prisma: prisma
}

export default context