


class Request {


    constructor(url, data = {}) {

        this.url = url
        this.data = data

        /*$.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })*/
    }


    redirect (assign = false) {
        
        if (assign) {
            history.pushState(null, null, document.URL)
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL)
            })
        }

        window.location.assign(this.url)
    }


    get(callback) {
        $.ajax({
            method: "GET",
            url: this.url
        })
        .done(async response => {
            callback.call(this, await response)
        })
    }


    post(callback) {
        $.ajax({
            type: 'POST',
            url: this.url,
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(this.data)
        })
        .done(async response => {
            callback.call(this, await response)
        })
    }
}
