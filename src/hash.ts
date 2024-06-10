import * as crypto from 'crypto'

/** Hashes the provided data using a salt generated with the specified number of rounds. */
export async function hashData(data: string, saltRounds: number): Promise<string> {
  const salt = await generateSalt(saltRounds)
  const hashedData = await hashWithSalt(data, salt)
  return hashedData
}

/** Compares the provided data with the hashed data to check for equality. */
export async function compareData(data: string, hashedData: string): Promise<boolean> {
  const [salt] = hashedData.split('$')
  const compareHash = await hashWithSalt(data, salt)
  return compareHash === hashedData
}

async function generateSalt(saltRounds: number): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(saltRounds, (err, buffer) => {
      if (err) {
        reject(err)
      } else {
        resolve(buffer.toString('hex'))
      }
    })
  })
}

async function hashWithSalt(data: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const iterations = 100000 // Number of iterations (similar to bcrypt's cost factor)
    crypto.pbkdf2(data, salt, iterations, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err)
      } else {
        resolve(`${salt}$${derivedKey.toString('hex')}`)
      }
    })
  })
}
