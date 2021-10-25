const crypto = require('crypto')
const CryptoJS = require('crypto-js')

const security = require('../config/app').security



class Security {


    constructor () {
        this.algorithm = security.ALGORITHM
        this.vector = security.VECTOR
        this.key = security.KEY
    }


    instance () {
        return {
            bcrypt: security.bcrypt
        }
    }


    cbcEncrypted (plainText) {

        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.vector)
        let encrypted = cipher.update(plainText, 'utf-8', 'hex')

        return (encrypted += cipher.final('hex'))
    }


    cbcDecrypted (encrypted) {

        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.vector)
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8')

        return (decrypted += decipher.final('utf-8'))
    }


    encrypted (plainText) {
        const cipher = CryptoJS.AES.encrypt(plainText, this.key)
        return cipher.toString()
    }


    decrypted (encrypted) {
        const bytes  = CryptoJS.AES.decrypt(encrypted, this.key)
        return bytes.toString(CryptoJS.enc.Utf8)
    }


    encoded (plainText) {
        return new Buffer(plainText).toString('hex')
    }


    decoded (encoded) {
        return new Buffer(encoded, 'hex').toString()
    }


    random () {
        let random = ''
        
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charsLen = chars.length
        
        for (var i = 0; i < charsLen; i++)
            random += chars.charAt(Math.floor(Math.random() * charsLen))

        return this.encrypted(random)
    }
}



module.exports = new Security()
