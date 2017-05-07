//stats is data which must be obtained drom open Api

let stats = [
    { value: 20, date: new Date("2011/11/30") },
    { value: 40, date: new Date("2011/12/01") },
    { value: 45, date: new Date("2011/12/02") },
    { value: 50, date: new Date("2011/12/03") },
    { value: 25, date: new Date("2011/12/04") },
    { value: 30, date: new Date("2011/12/05") },
    { value: 22, date: new Date("2011/12/06") },
    { value: 40, date: new Date("2011/12/07") },
    { value: 20, date: new Date("2011/12/08") },
    { value: 40, date: new Date("2011/12/09") },
    { value: 39, date: new Date("2011/12/10") },
    { value: 32, date: new Date("2011/12/11") },
    { value: 32, date: new Date("2011/12/12") },
    { value: 45, date: new Date("2011/12/13") },
    { value: 40, date: new Date("2011/12/14") },
    { value: 40, date: new Date("2011/12/15") },
    { value: 31, date: new Date("2011/12/16") },
    { value: 30, date: new Date("2011/12/17") },
    { value: 35, date: new Date("2011/12/18") },
    { value: 22, date: new Date("2011/12/19") },
    { value: 23, date: new Date("2011/12/20") },
    { value: 21, date: new Date("2011/12/21") },
    { value: 19, date: new Date("2011/12/22") },
    { value: 28, date: new Date("2011/12/23") },
    { value: 33, date: new Date("2011/12/24") },
    { value: 37, date: new Date("2011/12/25") },
    { value: 35, date: new Date("2011/12/26") },
    { value: 33, date: new Date("2011/12/27") },
    { value: 35, date: new Date("2011/12/28") },
    { value: 41, date: new Date("2011/12/29") },
    // { value: 35, date: new Date("2011/12/30") },
    // { value: 29, date: new Date("2011/12/31") },
    // { value: 45, date: new Date("2012/01/01") },
    // { value: 45, date: new Date("2012/01/02") },
    // { value: 42, date: new Date("2012/01/03") },
    // { value: 30, date: new Date("2012/01/04") },
    // { value: 30, date: new Date("2012/01/05") },
    // { value: 30, date: new Date("2012/01/06") },
    // { value: 44, date: new Date("2012/01/07") },
    // { value: 43, date: new Date("2012/01/08") },
    // { value: 39, date: new Date("2012/01/09") },
    // { value: 31, date: new Date("2012/01/10") },
    // { value: 39, date: new Date("2012/01/11") },
    // { value: 40, date: new Date("2012/01/12") },
    // { value: 39, date: new Date("2012/01/13") },
    // { value: 34, date: new Date("2012/01/14") },
    // { value: 41, date: new Date("2012/01/15") },
    // { value: 31, date: new Date("2012/01/16") },
    // { value: 27, date: new Date("2012/01/17") },
    // { value: 45, date: new Date("2012/01/18") },
    // { value: 53, date: new Date("2012/01/19") },
    // { value: 51, date: new Date("2012/01/20") },
    // { value: 31, date: new Date("2012/01/21") },
    // { value: 27, date: new Date("2012/01/22") }
];


class ChartProvider {


    createChart() {
            $("#line-chart").kendoChart({
                title: {
                    text: "Index overview"
                },
                dataSource: {
                    data: stats
                },
                series: [{
                    type: "line",
                    aggregate: "avg",
                    field: "value",
                    categoryField: "date"
                }],
                categoryAxis: {
                    baseUnit: "automatic"
                }
            });
        }
        // chart is responsive after refresh


    refresh() {
        var chart = $("#line-chart").data("kendoChart"),
            series = chart.options.series,
            categoryAxis = chart.options.categoryAxis,
            baseUnitInputs = $("input:radio[name=baseUnit]"),
            aggregateInputs = $("input:radio[name=aggregate]");

        for (var i = 0, length = series.length; i < length; i++) {
            series[i].aggregate = aggregateInputs.filter(":checked").val();
        };

        categoryAxis.baseUnit = baseUnitInputs.filter(":checked").val();

        chart.refresh();
    }
}

const chartProvider = new ChartProvider();
export { chartProvider };