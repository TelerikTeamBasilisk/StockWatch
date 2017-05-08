const calendar = (function() {

    function showCalendar() {
        $("#datepicker").datepicker();
    }
    return { showCalendar };

}());

export { calendar };