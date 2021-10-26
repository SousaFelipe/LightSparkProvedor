const Authorization = require("./Authorization")



module.exports = (async (request, response) => {
    const { access } = await Authorization(request)

    if (access && access.authorized) {
        return await response.redirect('/dashboard')
    }

    return false
})
