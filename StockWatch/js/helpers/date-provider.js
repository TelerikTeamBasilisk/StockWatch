const time = (function() {

    function startTime() {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        $('#hour-minute').html(`${h}:${m}:${s}`);
        let t = setTimeout(startTime, 1000);
    }

    function checkTime(i) {
        if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
        return i;
    }

    function getDate() {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        $('#date').html(`${day} ${month} ${year}`);
    }

    return {
        startTime,
        getDate
    };
}());
export { time };