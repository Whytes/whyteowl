import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query

  console.log('[POST DETAIL API] Request received:', {
    method: req.method,
    postId: id
  })

  if (req.method === 'GET') {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: id,
          status: 'PUBLISHED'
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          comments: {
            where: {
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
          }
        }
      })

      if (!post) {
        console.log('[POST DETAIL API] Post not found:', id)
        return res.status(404).json({ error: 'Post not found' })
      }

      console.log('[POST DETAIL API] Post found:', post.id)
      res.status(200).json(post)
    } catch (error) {
      console.error('[POST DETAIL API] Error fetching post:', error)
      res.status(500).json({ error: 'Failed to fetch post' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
