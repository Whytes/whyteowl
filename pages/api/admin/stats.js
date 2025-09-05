import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // Check if user is authenticated and is admin
  const session = await getSession({ req })
  if (!session || session.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied' })
  }

  try {
    // Get user statistics
    const totalUsers = await prisma.user.count()
    const activeUsers = await prisma.user.count({ where: { isActive: true } })
    const adminUsers = await prisma.user.count({ where: { role: 'ADMIN' } })

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

    // Get recent audit logs
    const recentLogs = await prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    })

    res.status(200).json({
      stats: {
        totalUsers,
        activeUsers,
        adminUsers
      },
      recentUsers,
      recentLogs
    })
  } catch (error) {
    console.error('Admin API error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
