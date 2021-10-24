


class Modal {


    constructor (id, isFrame = false) {
        this.id = id

        this.element = isFrame
            ? parent.document.getElementById(id)
            : document.getElementById(id)

        this.modal = this.element.childNodes[1]
        this.modalHeader = this.modal.childNodes[1]

        if (this.modalHeader) {
            this.bindAction()
        }
    }


    bindAction () {
        const self = this
        const closes = $(`*[data-modal-close="${ this.id }"]`)

        $(closes).each(function () {
            $(this).on('click', function(e) {
                self.close()
            })
        })
    }


    show () {
        const modal = this.modal

        $(this.element).fadeIn('fast', function() {
            $(this).css('display', 'flex')

            $(modal).fadeIn('fast', function () {
                $(this).css('display', 'flex')
            })
        })

        return this
    }


    close () {
        const modal = this.modal

        $(this.element).fadeOut('fast', function() {
            $(this).css('display', 'none')

            $(modal).fadeOut('fast', function () {
                $(this).css('display', 'none')
            })
        })

        return this
    }
}
