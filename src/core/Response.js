


class Response {


    constructor (response) {
        this.response = response
        this.status = 200
        this.message = 'OK'
    }


    ok (message = 'Ok') {
        this.status = 200
        this.message = message
        return this
    }


    notFound (message = 'Not Found') {
        this.status = 404
        this.message = message
        return this
    }


    forbidden (message = 'Forbidden') {
        this.status = 403
        this.message = message
        return this
    }


    internalServerError (message = 'Internal Server Error') {
        this.status = 500
        this.message = message
        return this
    }


    json (data = false) {

        const content = data
            ? { ...data, message: this.message }
            : { message: this.message }

        return this.response.status(this.status).json(content)
    }
}



module.exports = Response
