import * as crypto from 'node:crypto'

/** Decrypts the provided encrypted text using a secret key. */
export function decrypt(encrypted: { iv: string; content: string }, secretKey: string) {
  // Type checking
  if (typeof encrypted.iv !== 'string') throw new TypeError('Encrypted IV must be a string')
  if (typeof encrypted.content !== 'string') throw new TypeError('Encrypted content must be a string')
  if (typeof secretKey !== 'string') throw new TypeError('Secret Key must be a string')

  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(encrypted.iv, 'hex')) // Create a Decipher instance

  let decrypted = decipher.update(encrypted.content, 'hex', 'utf8') // Decrypt the content
  decrypted += decipher.final('utf8') // Finalize the decryption

  return decrypted
}
