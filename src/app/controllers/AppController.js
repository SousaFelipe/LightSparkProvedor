



class AppController {



    login (request, response) {
        return response.render('auth/login')
    }
}



module.exports = new AppController()
