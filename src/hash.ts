import * as crypto from 'crypto'

/** Hashes the provided data using a salt generated with the specified number of rounds. */
export async function hashData(data: string, saltRounds: number): Promise<string> {
  // Type checking
  let thisSaltRounds: number
  if (typeof data !== 'string') throw new TypeError('Data must be a string')
  if (typeof saltRounds === 'number') thisSaltRounds = saltRounds
  else if (typeof length === 'string' || typeof length === 'bigint') {
    const lengthNumber = Number(length)
    if (Number.isFinite(Number(length))) thisSaltRounds = lengthNumber
    else throw new TypeError('Length must be a valid number')
  } else throw new TypeError('Length must be a valid number')

  const salt = await generateSalt(thisSaltRounds)
  const hashedData = await hashWithSalt(data, salt)
  return hashedData
}

/** Compares the provided data with the hashed data to check for equality. */
export async function compareData(data: string, hashedData: string): Promise<boolean> {
  // Type checking
  if (typeof data !== 'string' || typeof hashedData !== 'string') throw new TypeError('Data must be a string')

  const [salt] = hashedData.split('h')
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
    const iterations = 100000 // Number of iterations
    crypto.pbkdf2(data, salt, iterations, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err)
      } else {
        resolve(`${salt}h${derivedKey.toString('hex')}`)
      }
    })
  })
}
