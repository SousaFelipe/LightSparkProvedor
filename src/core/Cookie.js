


class Cookie {


    constructor (cookies) {
        this.cookies = cookies
    }


    encoded (key) {
        return this.cookies[key]
            ? this.cookies[key] : false
    }


    decoded (key) {
        return this.cookies[key]
            ? decodeURIComponent(this.cookies[key]) : false
    }
}



module.exports = Cookie
