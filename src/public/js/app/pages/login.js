


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
        new Request('auth', credentials).post(response => {
            if (response.errors.email) {
                window.APP.component('input', 'inputEmail').invalidate()
                statusAlert.display(response.errors.email)
            }
            else if (response.errors.password) {
                window.APP.component('input', 'inputPassword').invalidate()
                statusAlert.display(response.errors.password)
            }
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
