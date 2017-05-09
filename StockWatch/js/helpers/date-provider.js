import { stockData } from 'stockData';

const time = (function () {

    function startTime() {
        let today = new Date();
        let h = formatOneDigitNumber(today.getHours());
        let m = formatOneDigitNumber(today.getMinutes());
        let s = formatOneDigitNumber(today.getSeconds());
        $('#hour-minute').html(`${h}:${m}:${s}`);

        let openClose = stockData.getOpeningClosingTime();
        $('#state').html(`NASDAQ is ${openClose.State}.`);
        $('#will').html(`${openClose.Will} in ${formatOneDigitNumber(openClose.Hours)}:${formatOneDigitNumber(openClose.Minutes)}:${formatOneDigitNumber(openClose.Seconds)}`);

        if (window.location.href.includes('watchlist')) {
            setTimeout(startTime, 1000);
        }
    }

    function getDate() {
        let today = new Date();
        let day = formatOneDigitNumber(today.getDate());
        let month = formatOneDigitNumber(today.getMonth() + 1);
        let year = today.getFullYear();
        $('#date').html(`${day}/${month}/${year}`);
    }

    function buildDatesForDatePicker(date) {
        let dd = formatOneDigitNumber(date.getDate());
        let mm = formatOneDigitNumber(date.getMonth() + 1);

        return `${mm}/${dd}/${date.getFullYear()}`;
    }

    function getDateFromDatePicker(str) {
        let inputs = str.split('/');
        return new Date(+inputs[2], +inputs[0], +inputs[1]);
    }

    function buildDatesForYAHOO(date) {
        let dd = formatOneDigitNumber(date.getDate());
        let mm = formatOneDigitNumber(date.getMonth() + 1);

        return `${date.getFullYear()}-${mm}-${dd}`;
    }

    // add zero in front of numbers < 10
    function formatOneDigitNumber(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    return {
        startTime,
        getDate,
        buildDatesForDatePicker,
        getDateFromDatePicker,
        buildDatesForYAHOO,
    };
}());
export { time };