import 'chart-js';
const chartProvider = (function () {

    let lineChart;

    function createChartData(values) {
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

    function updateChart(values) {
        if (lineChart === undefined) {
            createChart(values);
        }
        else {
            let benchmark = values[0];
            let stock = values[1];

            lineChart.data.labels = benchmark.Dates;
            lineChart.data.datasets[0].data = benchmark.Prices;
            lineChart.data.datasets[0].label = benchmark.Ticker;

            lineChart.data.datasets[1].data = stock.Prices;
            lineChart.data.datasets[1].label = stock.Ticker;

            lineChart.update();
        }
    }

    function createChart(values) {
        let lineChartData = createChartData(values);

        let canvas = $('#chart').get(0);
        let ctx = canvas.getContext('2d');

        lineChart = new Chart(ctx, {
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
        return lineChart;
    }

    return {
        updateChart: updateChart,
    };

}());

export { chartProvider };
