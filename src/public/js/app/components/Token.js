


class Token {


    constructor (token) {
        this.token = token
    }


    isPre () {
        return (
            !this.isAtivo() && !this.isBloqueado() && !this.isCancelado()
        )
    }


    isAtivo () {
        return (this.token.status == 'A')
    }


    isBloqueado () {
        return (this.token.status == 'B')
    }


    isCancelado () {
        return (this.token.status == 'B')
    }


    status () {

        let cor = this.isAtivo()
            ? 'accent'
            : this.isPre()
                ? 'warning'
                : this.isBloqueado()
                    ? 'danger'
                    : 'tertiary'

        return `<span class="badge badge-sm bg-${ cor }-5 text-primary"><b>${ this.label() }</b></span>`
    }


    label (action = false) {

        if (action) {
            return this.isAtivo()
                ? 'BLOQUEAR'
                : this.isPre()
                    ? 'ATIVAR'
                    : this.isBloqueado()
                        ? 'LIBERAR'
                        : 'CANCELAR'
        }

        return this.isAtivo()
            ? 'ATIVO'
            : this.isPre()
                ? 'PRÉ-CADASTRO'
                : this.isBloqueado()
                    ? 'BLOQUEADO'
                    : 'CANCELADO'
    }


    action () {
        return `<span class="badge badge-sm text-primary"><b>${ this.label(true) }</b></span>`
    }
}
