


class DateTime {


    offset () {
        let today = new Date()
        let local = -(today.getTimezoneOffset() / 60)
        return ((-3) - local)
    }


    now () {
        let offset = this.offset()
        let now = new Date(new Date().getTime() + offset * 3600 * 1000)
        return `${ now.getFullYear() }-${ now.getMonth() }-${ now.getDay() } ${ now.getHours() - 3 }:${ now.getMinutes() }:${ now.getSeconds() }`
    }
}



module.exports = new DateTime()
