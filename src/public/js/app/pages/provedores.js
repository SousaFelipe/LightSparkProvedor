


$.extend($.fn.dataTable.defaults, {
    "autoWidth":    false,
    "searching":    false,
    "info":         false,
    "lengthChange": false,
    "pageLength":   10,
    language: {
        oPaginate: {
            sPrevious: '<i class="material-icons-two-tone">navigate_before</i>',
            sNext: '<i class="material-icons-two-tone">navigate_next</i>'
        }
    }
})

const table = $('#provedores').DataTable({
    order: [[ 1, 'asc' ]],
    columnDefs: [
        { targets: [0, 1, 2], className: 'text-start' },
        { targets: [3], className: 'flex-row justify-end align-center', orderable: false }
    ]
})



$(function () {

    /*new Request(window.APP.url('admin').web('provedores/listar'))
        .get(async response => {
            const provedores = await response.provedores

            provedores.forEach(provedor => {

                table.row.add([
                    window.APP.mask(provedor.cnpj).cnpj(),
                    provedor.nome_fantasia,
                    `${ provedor.logradouro }, ${ provedor.municipio }-${ provedor.uf }`,
                    (`<button type="button" class="btn sm bg-light-two"><i class="material-icons-two-tone fs-lg">open_in_new</i></button>`)
                ])

                table.draw()
            })
        })*/
})



function newProvedorModal() {
    new Modal('new-provedor-modal')
        .show()
}
