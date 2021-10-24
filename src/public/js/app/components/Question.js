


class Question {


    constructor (id, isFrame = false) {

        this.id = id
        this.document = isFrame ? parent.document : document
        this.element = this.document.getElementById(id)
        this.modal = this.document.getElementById(`${ id }-modal`)
        this.close = this.document.getElementById(`${ id }-close`)

        this.types = {
            'confirm':  () => 'brand',
            'info':     () => 'info',
            'warning':  () => 'warning',
            'danger':   () => 'danger',
        }

        this.images = {
            'confirm':  () => 'help-64',
            'info':     () => 'info-64',
            'warning':  () => 'error-64',
            'danger':   () => 'cancel-64'
        }
    }


    bindActions () {
        const self = this

        let confirmButton = this.document.getElementById(`${ this.id }-confirm`)
        let cancelButton = this.document.getElementById(`${ this.id }-cancel`)

        $(confirmButton).on('click', function () {
            if (this.onConfirm) {
                this.onConfirm.call(this)
            }
            self.hide()
        })

        $(cancelButton).on('click', function () {
            if (this.onCancel) {
                this.onCancel.call(this)
            }
            self.hide()
        })

        if (this.close) {
            $(this.close).on('click', function () {
                self.hide()
            })
        }
    }


    show () {
        this.bindActions()

        const modal = this.modal

        $(this.element).fadeIn('fast', function() {
            $(this).css('display', 'flex')

            $(modal).fadeIn('fast', function () {
                $(this).css('display', 'flex')
            })
        })

        return this
    }



    hide () {
        let modal = this.modal
        let spanQuestion = $(this.spanQuestion)
        let spanExplain = $(this.spanExplain)

        $(this.element).fadeOut('fast', function() {
            $(this).css('display', 'none')

            $(modal).fadeOut('fast', function () {
                $(this).css('display', 'none')
            })

            spanQuestion.text('')
            spanExplain.text('')
        })

        return this
    }


    type (type) {
        let currentTypeButton = (this.types[type] || this.types['confirm'])()
        let currentTypeImage = (this.images[type] || this.images['info'])()

        this.document.getElementById(`${ this.id }-confirm`).classList.add(`btn-${ currentTypeButton }`)
        this.document.getElementById(`${ this.id }-img`).innerHTML = (`<img src="${ window.APP.assets(currentTypeImage).icon() }"/>`)

        return this
    }


    question (question) {
        this.spanQuestion = this.document.getElementById(`${ this.id }-question`)
        $(this.spanQuestion).append(question)
        return this
    }


    explain (explain) {
        this.spanExplain = this.document.getElementById(`${ this.id }-explain`)
        $(this.spanExplain).append(explain)
        return this
    }


    cancel (onCancel) {
        this.onCancel = onCancel
        return this
    }


    confirm (onConfirm) {
        this.onConfirm = onConfirm
        return this
    }
}
