import * as crypto from 'node:crypto'

/** Generates a random key. */
export function generateKey(length?: number) {
  // Type checking
  let thisLength: number | undefined
  if (typeof length === 'number' || length === undefined || length === null) thisLength = length === null ? undefined : length
  else if (typeof length === 'string' || typeof length === 'bigint') {
    const lengthNumber = Number(length)
    if (Number.isFinite(Number(length))) thisLength = lengthNumber
    else throw new TypeError('Length must be a valid number')
  } else throw new TypeError('Length must be a valid number')

  return crypto.randomBytes(thisLength ?? 32).toString('hex')
}
/** Encrypts the provided text using a secret key. */
export function encrypt(text: string, secretKey: string) {
  // Type checking
  if (typeof text !== 'string') throw new TypeError('Text must be a string')
  if (typeof secretKey !== 'string') throw new TypeError('Secret Key must be a string')

  const iv = crypto.randomBytes(16) // Generate a random initialization vector (16 bytes for AES)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv) // Create a Cipher instance

  let encrypted = cipher.update(text, 'utf8', 'hex') // Encrypt the text
  encrypted += cipher.final('hex') // Finalize the encryption

  return {
    iv: iv.toString('hex'), // Return the initialization vector in hex format
    content: encrypted, // Return the encrypted content in hex format
  }
}
