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


    encrypted (plainText) {
        const cipher = CryptoJS.AES.encrypt(plainText, this.key)
        return cipher.toString()
    }


    decrypted (encrypted) {
        const bytes  = CryptoJS.AES.decrypt(encrypted, this.key)
        return bytes.toString(CryptoJS.enc.Utf8)
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
