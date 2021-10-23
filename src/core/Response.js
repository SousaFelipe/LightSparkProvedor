const Auth = require('../app/middlewares/Auth')
const Subscription = require('../app/middlewares/Subscription')



class Response {


    constructor (response) {
        this.response = response
        this.status = 200
        this.message = 'OK'
        this.mustBeAuth = false
        this.mustBeRegistered = false
    }


    auth (request = false) {
        
        if (request) {
            this.request = request
        }
        
        this.mustBeAuth = true
        return this
    }


    registered (request = false) {
        
        if (request) {
            this.request = request
        }
        
        this.mustBeRegistered = true
        return this
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


    async view (path, data = false) {
        
        let content = data
            ? { data: { ...data } }
            : {  }

        if (this.request) {

            if (this.mustBeAuth) {
                const auth = await Auth(this.request)
    
                if (!auth.acesso.authorization) {
                    return this.response
                        .render('errors/authorization')
                }

                content = { ...auth, ...content }
            }
    
            if (this.mustBeRegistered) {
                const subs = await Subscription(this.request)
    
                if (!subs.registro.subscription) {
                    return this.response
                        .render(`errors/subscription/${ subs.description }`)
                }

                content = { ...subs, ...content }
            }
        }

        return this.response.render(path, content)
    }


    async json (data = false) {

        let content = data
            ? { message: this.message, data: { ...data } }
            : { message: this.message }

            if (this.request) {

                if (this.mustBeAuth) {
                    const auth = await Auth(this.request)
                    content = { ...auth, ...content }
                }
        
                if (this.mustBeRegistered) {
                    const subs = await Subscription(this.request)
                    content = { ...subs, ...content }
                }
            }

        return this.response
            .status(this.status).json(content)
    }
}



module.exports = Response
