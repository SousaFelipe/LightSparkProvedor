


class Cookie {


    constructor (cookies) {
        this.cookies = cookies
    }


    get (key) {
        return this.cookies[key]
            ? this.cookies[key] : false
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
