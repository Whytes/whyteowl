import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  try {
    console.log('Starting registration process...')
    console.log('Database URL exists:', !!process.env.DATABASE_URL)
    console.log('Connecting to database...')

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    console.log('Database query completed, existing user:', !!existingUser)

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    console.log('Password hashed successfully')

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    console.log('User created successfully:', user.id)
    res.status(201).json({ message: 'User created successfully', userId: user.id })
  } catch (error) {
    console.error('Registration error details:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}
