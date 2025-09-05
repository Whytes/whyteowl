import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'

// Create a single Prisma instance for the API
let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // In development, use a global instance to prevent connection issues
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default async function handler(req, res) {
  console.log('[COMMENTS API] Request received:', {
    method: req.method,
    url: req.url,
    body: req.method === 'POST' ? req.body : undefined
  })

  if (req.method === 'GET') {
    try {
      const { postId } = req.query
      console.log('[COMMENTS API] GET request with postId:', postId)

      if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' })
      }

      const comments = await prisma.comment.findMany({
        where: {
          postId: postId,
          status: 'PUBLISHED'
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

      console.log('[COMMENTS API] Found comments:', comments.length)
      res.status(200).json(comments)
    } catch (error) {
      console.error('[COMMENTS API] Error fetching comments:', error)
      res.status(500).json({ error: 'Failed to fetch comments' })
    }
  } else if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
    console.log('[COMMENTS API] Session check:', {
      hasSession: !!session,
      userId: session?.user?.id,
      userEmail: session?.user?.email
    })

    if (!session) {
      console.log('[COMMENTS API] POST failed: No session')
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const { content, postId } = req.body
      console.log('[COMMENTS API] POST data:', { content, postId })

      if (!content || !postId) {
        console.log('[COMMENTS API] POST failed: Missing fields')
        return res.status(400).json({ error: 'Missing required fields' })
      }

      console.log('[COMMENTS API] Creating comment with data:', {
        content,
        postId,
        authorId: session.user.id
      })

      const comment = await prisma.comment.create({
        data: {
          content,
          postId,
          authorId: session.user.id
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })

      console.log('[COMMENTS API] Comment created successfully:', comment.id)
      res.status(201).json(comment)
    } catch (error) {
      console.error('[COMMENTS API] Error creating comment:', error)
      console.error('[COMMENTS API] Error details:', {
        message: error.message,
        code: error.code,
        meta: error.meta
      })
      res.status(500).json({ error: 'Failed to create comment' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
