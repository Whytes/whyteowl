import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  console.log('[USER UPDATE API] Request received:', {
    method: req.method,
    url: req.url
  })

  const session = await getServerSession(req, res, authOptions)
  console.log('[USER UPDATE API] Session check:', {
    hasSession: !!session,
    userId: session?.user?.id,
    userEmail: session?.user?.email
  })

  if (!session) {
    console.log('[USER UPDATE API] Failed: No session')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }

  try {
    const { name, email, currentPassword, newPassword } = req.body
    console.log('[USER UPDATE API] Update data:', {
      name: !!name,
      email: !!email,
      hasCurrentPassword: !!currentPassword,
      hasNewPassword: !!newPassword
    })

    // Get current user data
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    const updateData = {}

    // Handle name update
    if (name !== undefined && name !== currentUser.name) {
      if (!name.trim()) {
        return res.status(400).json({ error: 'Name cannot be empty' })
      }
      updateData.name = name.trim()
    }

    // Handle email update
    if (email !== undefined && email !== currentUser.email) {
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email address' })
      }

      // Check if email is already taken
      const existingUser = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (existingUser && existingUser.id !== session.user.id) {
        return res.status(400).json({ error: 'Email is already in use' })
      }

      updateData.email = email.toLowerCase()
    }

    // Handle password update
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to change password' })
      }

      // Verify current password
      if (!currentUser.password) {
        return res.status(400).json({ error: 'Cannot change password for OAuth accounts' })
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, currentUser.password)
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' })
      }

      // Validate new password
      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters long' })
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 12)
      updateData.password = hashedPassword
    }

    // Only update if there are changes
    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({ message: 'No changes to update' })
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true
      }
    })

    console.log('[USER UPDATE API] User updated successfully:', updatedUser.id)
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('[USER UPDATE API] Error updating user:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
}
