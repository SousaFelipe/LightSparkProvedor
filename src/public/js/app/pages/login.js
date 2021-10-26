


let statusAlert = null
let loginButton = null



$(function () {

    statusAlert = new Alert('statusLoginAlert', 5)
    loginButton = window.APP.component('button', 'btnLogin')

})



let login = function () {

    const credentials = getValidated(
        document.getElementById('inputEmail').value,
        document.getElementById('inputPassword').value
    )

    if (credentials) {
        new Request('login', credentials).post(response => {
            const data = response.data

            if (data.errors) {
                if (data.errors.email) {
                    window.APP.component('input', 'inputEmail').invalidate()
                    statusAlert.display(data.errors.email)
                }
                else if (data.errors.password) {
                    window.APP.component('input', 'inputPassword').invalidate()
                    statusAlert.display(data.errors.password)
                }
            }
            else new Request('/dashboard').redirect(true)
        })
    }
    else {
        statusAlert.display(`Preencha os campos <b>Email</b> e <b>Senha</b>!`)
    }
}



let getValidated = function (email, password) {
    return ((email && email.length > 0) && (password && password.length >= 8))
        ? { email: email, password: password }
        : false
}
