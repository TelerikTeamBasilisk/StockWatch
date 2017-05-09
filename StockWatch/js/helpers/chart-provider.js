import 'chart-js';
const chartProvider = (function() {

    let firstIndex = 'S&P 500',
        secondIndex = 'Dow Jones';

    let lineChartData = {
        labels: ['Date 1', 'Date 2', 'Date 3', 'Date 4', 'Date 5', 'Date 6', 'Date 7', 'Date 8', 'Date 9', 'Date 10', 'Date 11', 'Date 12', 'Date 13', 'Date 14'], //data from API for the first and second chart X
        datasets: [{
            data: [20, 30, 54, 20, 40, 45, 60, 35, 42, 64, 50, 32, 14, 27], //data from API for the first chart Y
            label: firstIndex,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: 'rgba(75,192,192,1)',
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
            data: [60, 10, 40, 30, 56, 30, 20, 25, 33, 44, 23, 53, 23, 21], //data from API for the second chart Y
            label: secondIndex,
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

    function createChart() {
        let canvas = $("#chart").get(0);
        let ctx = canvas.getContext("2d");

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
