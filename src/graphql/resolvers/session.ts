import { presidentId, vicePresidentId } from '../../constants/index'

const sessionResolver = {
  Session: {
    officials: async (parent: any, __: any, { prisma }: any) => {
      return prisma.leadershipHistory.findMany({
        where: {
          sessionId: parent.id,
          level: 'FACULTY',
          positionId: {
            not: {
              in: [presidentId, vicePresidentId]
            }
          }
        },
        include: {
          department: true,
          position: true
        }
      })
    },
    president: (parent: any, __: any, { prisma }: any) => {
      return prisma.leadershipHistory.findFirst({
        where: {
          sessionId: parent.id,
          positionId: presidentId,
          level: 'FACULTY'
        },
        include: {
          department: true
        }
      })
    },
    vicePresident: (parent: any, __: any, { prisma }: any) => {
      return prisma.leadershipHistory.findFirst({
        where: {
          sessionId: parent.id,
          positionId: vicePresidentId,
          level: 'FACULTY'
        },
        include: {
          department: true
        }
      })
    }
  },
  Query: {
    sessions: (_: any, __: any, { prisma }: any) => {
      return prisma.session.findMany()
    },
    session: (_: any, args: any, { prisma }: any) => {
      const { sessionId } = args
      return prisma.session.findUnique({
        where: {
          id: sessionId
        }
      })
    }
  },
  Mutation: {
    createSession: async (_: any, args: any, { prisma }: any) => {
      const { session, status } = args
      return prisma.session.create({
        data: {
          session,
          status
        }
      })
    }
  }
}

export default sessionResolver
