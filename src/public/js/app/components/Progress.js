


class Progress {


    constructor(id, iframe = false) {

        this.document = iframe
            ? parent.document
            : document

        this.progress = this.document.getElementById(id)
    }


    load (percent) {
        $(this.progress).css({
            display:    'block',
            width:      (percent + '%')
        })
    }


    reset () {
        $(this.progress).css({
            display:    'none',
            width:      '0%'
        })
    }
}
