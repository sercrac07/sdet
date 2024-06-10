# SDET

[![npm version](https://badge.fury.io/js/sdet.svg)](https://badge.fury.io/js/sdet)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SDET is a lightweight and efficient toolkit for encrypting and decrypting data securely using Node.js's built-in `crypto` module. It provides easy-to-use functions to encrypt and decrypt data.

## Features

- **Easy-to-use:** Simple API for encrypting and decrypting data.
- **Secure:** Utilizes Node.js's built-in `crypto` module for robust encryption.

## Installation

You can install the package via npm:

```bash
npm install sdet
```

## Usage

```javascript
import sdet from 'sdet'

// Generate a secret key (hexadecimal format)
const secretKey = sdet.generateKey(32) // Example: generate a 32-byte key

// Encrypt data
const textToEncrypt = 'This is a secret message'
const encryptedData = sdet.encrypt(textToEncrypt, secretKey)

// Decrypt data
const decryptedData = sdet.decrypt(encryptedData, secretKey)

console.log('Encrypted:', encryptedData)
console.log('Decrypted:', decryptedData)

// Hash data
const hashedData = await hashData('sensitive data', 10)

// Compare hashed data
const isMatch = await compareData('sensitive data', hashedData)

console.log('Hashed data:', hashedData)
console.log('Data match:', isMatch)
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request. Here are some ways you can contribute:

- **Bug Reports:** If you find any bugs or unexpected behavior, please open an issue describing the problem.
- **Feature Requests:** If you have ideas for new features or improvements, feel free to suggest them by opening an issue.
- **Code Contributions:** Contributions to the codebase via pull requests are highly appreciated. Before submitting a pull request, please make sure to follow the contribution guidelines below.

### Contribution Guidelines

1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature/fix: `git checkout -b feature-name`.
3. Make changes and test them thoroughly.
4. Ensure that your code follows the existing code style and conventions.
5. Update the README and documentation if necessary.
6. Commit your changes with descriptive commit messages.
7. Push your branch to your fork: `git push origin feature-name`.
8. Open a pull request to the `main` branch of the original repository.

Thank you for contributing to SDET!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
