import * as crypto from 'node:crypto'

export function generateKey() {
  return crypto.randomBytes(32).toString('hex')
}

export function encrypt(text: string, secretKey: string) {
  const iv = crypto.randomBytes(16) // Generate a random initialization vector (16 bytes for AES)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv) // Create a Cipher instance

  let encrypted = cipher.update(text, 'utf8', 'hex') // Encrypt the text
  encrypted += cipher.final('hex') // Finalize the encryption

  return {
    iv: iv.toString('hex'), // Return the initialization vector in hex format
    content: encrypted, // Return the encrypted content in hex format
  }
}
