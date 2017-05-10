import 'chart-js';
const chartProvider = (function () {

    function rearrangeData(values) {
        let benchmark = values[0];
        let stock = values[1];

        let lineChartData = {
            labels: benchmark.Dates, //data from API for the first and second chart X
            datasets: [{
                data: benchmark.Prices, //data from API for the first chart Y
                label: benchmark.Ticker,
                backgroundColor: 'rgba(86,177,238,0.4)',
                borderColor: 'rgba(86,177,238,1)',
                borderWidth: 2,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: 'rgba(255,255,255,0.5)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.2
            }, {
                data: stock.Prices, //data from API for the second chart Y
                label: stock.Ticker,
                backgroundColor: 'rgba(26, 193, 21,0.4)',
                borderColor: 'rgba(26, 193, 21,1)',

                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: 'rgba(255,255,255,0.5)',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                lineTension: 0.2,
            }]

        };

        return lineChartData;
    }

    function createChart(values) {
        let lineChartData = rearrangeData(values);

        let canvas = $('#chart').get(0);
        let ctx = canvas.getContext('2d');

        let indexChart = new Chart(ctx, {
            type: 'line',
            data: lineChartData,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        return indexChart;
    }

    return {
        createChart
    };

}());

export { chartProvider };
