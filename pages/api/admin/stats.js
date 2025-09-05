import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  console.log('[ADMIN API] Request received:', {
    method: req.method,
    url: req.url,
    headers: req.headers
  })

  if (req.method !== 'GET') {
    console.log('[ADMIN API] Method not allowed:', req.method)
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check if user is authenticated and is admin
  const session = await getServerSession(req, res, authOptions)
  console.log('[ADMIN API] Session check:', {
    hasSession: !!session,
    userRole: session?.user?.role,
    userId: session?.user?.id,
    sessionData: session
  })

  if (!session || session.user.role !== 'ADMIN') {
    console.log('[ADMIN API] Access denied - no session or not admin')
    return res.status(403).json({ message: 'Access denied' })
  }

  try {
    console.log('[ADMIN API] Starting database queries...')

    // Get user statistics
    const totalUsers = await prisma.user.count()
    console.log('[ADMIN API] Total users:', totalUsers)

    const activeUsers = await prisma.user.count({ where: { isActive: true } })
    console.log('[ADMIN API] Active users:', activeUsers)

    const adminUsers = await prisma.user.count({ where: { role: 'ADMIN' } })
    console.log('[ADMIN API] Admin users:', adminUsers)

    // Get recent users
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    })
    console.log('[ADMIN API] Recent users count:', recentUsers.length)

    // Get recent audit logs (this might fail if table doesn't exist)
    let recentLogs = []
    try {
      recentLogs = await prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true }
          }
        }
      })
      console.log('[ADMIN API] Recent logs count:', recentLogs.length)
    } catch (auditError) {
      console.log('[ADMIN API] Audit log query failed (table might not exist):', auditError.message)
      recentLogs = []
    }

    const responseData = {
      stats: {
        totalUsers,
        activeUsers,
        adminUsers
      },
      recentUsers,
      recentLogs
    }

    console.log('[ADMIN API] Sending response with data')
    res.status(200).json(responseData)
  } catch (error) {
    console.error('[ADMIN API] Error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
