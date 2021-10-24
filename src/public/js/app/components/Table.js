


class Row {


    constructor (row) {
        this.row = $(row)
        this.id = this.row.attr('id')
    }


    action (content, action) {
        const id = this.id

        this.button = $(`<button type="button" class="control-action">${ content }</button>`)
        this.button.on('click', function (e) {
            action.call(this, id)
        })

        this.row.append(
            $('<div/>')
                .addClass('table-cell-action')
                .append(this.button)
        )
    }
}



class Table {


    constructor (id, settings = { }) {

        this.header = $(`#${ id } > div.table-header`)
        this.body = $(`#${ id } > div.table-body`)

        this.settings = settings
        this.rows = []

        this.layout = this.createLayout()
    }


    createLayout () {
        let inlineLayout = ``
        let lasColumnPos = (this.settings.columns.length - 1)

        this.settings.columns.forEach((col, i) => {
            inlineLayout += (i < lasColumnPos)
                ? `${ col }fr `
                : `${ col }fr`
        })

        return inlineLayout
    }


    applySettings (row) {
        const settings = this.settings

        if (settings.hovered && settings.hovered == true) {
            row.css('cursor', 'pointer')
                .hover(function (e) {
                    row.css('background-color', '#E2E8F4')
                },
                function (e) {
                    row.css('background-color', 'transparent')
                })
        }

        if (settings.action) {
            row.on('click', function (e) {
                settings.action.call(this, row)
            })
        }
    }


    addRow (id, data) {

        let row = $(`<div/>`)
            .attr('id', id)
            .addClass('table-row')
            .css('grid-template-columns', this.layout)

        data.forEach(data => {
            row.append(
                $('<div/>')
                    .addClass('table-cell')
                    .append(data)
            )
        })

        this.applySettings(row)
        this.rows.push(row)

        return new Row(row)
    }


    clear () {
        this.rows = []
        this.layout = ('')

        this.header.text(``)
        this.body.text(``)
    }


    renderHeader (header) {
        const isAction = (header == 'action')

        this.header.append(
            $(`<span/>`)
                .addClass(isAction ? 'table-header-action' : 'table-header-cell')
                .text(isAction ? 'AÇÃO' : header)
        )
    }


    render () {
        const body = this.body

        this.header.css('grid-template-columns', this.layout)
        this.settings.headers.forEach(header => this.renderHeader(header))

        this.rows.forEach(row => {
            body.append(row)
        })
    }
}
