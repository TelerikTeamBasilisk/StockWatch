const time = (function () {

    function startTime() {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = formatOneDigitNumber(m);
        s = formatOneDigitNumber(s);
        $('#hour-minute').html(`${h}:${m}:${s}`);
        let t = setTimeout(startTime, 1000);
    }

    // add zero in front of numbers < 10
    function formatOneDigitNumber(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    function getDate() {
        let today = new Date();
        let day = formatOneDigitNumber(today.getDate());
        let month = formatOneDigitNumber(today.getMonth() + 1);
        let year = today.getFullYear();
        $('#date').html(`${day}/${month}/${year}`);
    }

    return {
        startTime,
        getDate
    };
}());
export { time };