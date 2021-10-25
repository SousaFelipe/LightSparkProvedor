const Authorization = require('../app/middlewares/Authorization')
const Subscription = require('../app/middlewares/Subscription')



class Response {


    constructor (response) {
        this.response = response
        this.status = 200
        this.message = 'OK'
        this.mustBeAuth = false
        this.mustBeRegistered = false
    }


    registered (request = false) {
        if (request) this.request = request
        
        this.mustBeRegistered = true
        return this
    }


    authorized (request = false) {
        if (request) this.request = request
        
        this.mustBeAuth = true
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
            : { data: { } }

        if (this.request) {

            if (this.mustBeAuth) {
                const auth = await Authorization(this.request)

                content = { ...auth, ...content }
    
                if (!auth.access.authorized) {
                    return this.response
                        .render('errors/authorization', content)
                }
            }
    
            if (this.mustBeRegistered) {
                const subs = await Subscription(this.request)

                content = { ...subs, ...content }
    
                if (!subs.subscription.subscribed) {
                    return this.response
                        .render(`errors/subscription/${ subs.subscription.description }`, content)
                }
            }
        }

        return this.response.render(path, content)
    }


    async json (data = false) {

        let content = data
            ? { message: this.message, data: { ...data } }
            : { message: this.message, data: { } }

            if (this.request) {

                if (this.mustBeAuth) {
                    const auth = await Authorization(this.request)
                    content = { ...auth, ...content }
                }
        
                if (this.mustBeRegistered) {
                    const subs = await Subscription(this.request)
                    content = { ...subs, ...content }
                }
            }

        return this.response.status(this.status).json(content)
    }
}



module.exports = Response
