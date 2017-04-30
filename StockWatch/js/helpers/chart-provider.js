// should be taken from outside source
let title = 'Your portfolio performance: ';
let title2 = 'Portfolio allocation: ';

let series = [{
    name: "World",
    data: [15.7, 16.7, 20, 23.5, 26.6]
}, {
    name: "United States",
    data: [67.96, 68.93, 75, 74, 78]
}];

let categories = [2005, 2006, 2007, 2008, 2009];

let data = [{
    category: "Hydro",
    value: 22
}, {
    category: "Solar",
    value: 2
}, {
    category: "Nuclear",
    value: 49
}, {
    category: "Wind",
    value: 27
}];

class ChartProvider {


    getLineChart(identifier) {
        $(identifier).kendoChart({
            title: {
                text: title
            },
            legend: {
                position: 'left'
            },
            seriesDefaults: {
                type: 'line'
            },
            series: series,
            valueAxis: {
                labels: {
                    format: '"$ #,###"'
                }
            },
            categoryAxis: {
                categories: categories
            }
        });

    }

    getPieChart(identifier) {
        $(identifier).kendoChart({
            title: {
                text: title2
            },
            legend: {
                position: 'right'
            },
            seriesDefaults: {
                labels: {
                    visible: true,
                    format: '{n}%'
                }
            },
            series: [{
                type: 'pie',
                data: data
            }]
        });
    }
}

const chartProvider = new ChartProvider();
export { chartProvider };