const crypto = require('crypto')

const security = require('../config/app').security



class Security {


    constructor () {
        this.algorithm = security.ALGORITHM
        this.vector = security.VECTOR
        this.key = security.KEY
    }


    encrypted (plainText) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.vector)

        let encrypted = cipher.update(plainText, 'utf-8', 'hex')
            encrypted += cipher.final('hex')

        return encrypted
    }


    decrypted (encrypted) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.vector)
        
        let plainText = decipher.update(encrypted, 'hex', 'utf-8')
            plainText += decipher.final('utf8')

        return plainText
    }


    random (size = 32) {
        return crypto.randomBytes(size).toString('hex')
    }
}



module.exports = new Security()
