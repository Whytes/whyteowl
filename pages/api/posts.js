import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  console.log('[POSTS API] Request received:', {
    method: req.method,
    url: req.url,
    body: req.method === 'POST' ? req.body : undefined
  })

  const session = await getServerSession(req, res, authOptions)
  console.log('[POSTS API] Session check:', {
    hasSession: !!session,
    userId: session?.user?.id,
    userEmail: session?.user?.email
  })

  if (req.method === 'GET') {
    try {
      const { category } = req.query
      console.log('[POSTS API] GET request with category:', category)

      const posts = await prisma.post.findMany({
        where: {
          status: 'PUBLISHED',
          ...(category && { category })
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          _count: {
            select: {
              comments: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      console.log('[POSTS API] Found posts:', posts.length)
      res.status(200).json(posts)
    } catch (error) {
      console.error('[POSTS API] Error fetching posts:', error)
      res.status(500).json({ error: 'Failed to fetch posts' })
    }
  } else if (req.method === 'POST') {
    if (!session) {
      console.log('[POSTS API] POST failed: No session')
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const { title, content, category } = req.body
      console.log('[POSTS API] POST data:', { title, content, category })

      if (!title || !content || !category) {
        console.log('[POSTS API] POST failed: Missing fields')
        return res.status(400).json({ error: 'Missing required fields' })
      }

      console.log('[POSTS API] Creating post with data:', {
        title,
        content,
        category,
        authorId: session.user.id
      })

      const post = await prisma.post.create({
        data: {
          title,
          content,
          category,
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

      console.log('[POSTS API] Post created successfully:', post.id)
      res.status(201).json(post)
    } catch (error) {
      console.error('[POSTS API] Error creating post:', error)
      console.error('[POSTS API] Error details:', {
        message: error.message,
        code: error.code,
        meta: error.meta
      })
      res.status(500).json({ error: 'Failed to create post' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
