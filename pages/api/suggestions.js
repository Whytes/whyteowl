import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (req.method === 'GET') {
    try {
      const suggestions = await prisma.suggestion.findMany({
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
          createdAt: 'desc'
        }
      })

      res.status(200).json(suggestions)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      res.status(500).json({ error: 'Failed to fetch suggestions' })
    }
  } else if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      const { title, description, category } = req.body

      if (!title || !description || !category) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const suggestion = await prisma.suggestion.create({
        data: {
          title,
          description,
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

      res.status(201).json(suggestion)
    } catch (error) {
      console.error('Error creating suggestion:', error)
      res.status(500).json({ error: 'Failed to create suggestion' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).json({ error: `Method ${req.method} not allowed` })
  }
}
