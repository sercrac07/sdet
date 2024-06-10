import * as crypto from 'node:crypto'

export function decrypt(encrypted: { iv: string; content: string }, secretKey: string) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(encrypted.iv, 'hex')) // Create a Decipher instance

  let decrypted = decipher.update(encrypted.content, 'hex', 'utf8') // Decrypt the content
  decrypted += decipher.final('utf8') // Finalize the decryption

  return decrypted
}
